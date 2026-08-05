"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState } from "react";

type FormState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; preview: boolean; leadId: string }
  | { kind: "error"; message: string; field?: "platforms" | "contactValue" };

const platformOptions = ["TikTok LIVE", "Pococha", "17LIVE", "その他"];

export function LeadForm() {
  const [state, setState] = useState<FormState>({ kind: "idle" });
  const started = useRef(false);
  const idempotencyKey = useRef<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.kind === "success") successRef.current?.focus();
  }, [state.kind]);

  function markStarted() {
    if (!started.current) {
      started.current = true;
      track("lead_start", { placement: "contact_form" });
    }
  }

  async function submit(formData: FormData) {
    const platforms = formData.getAll("platforms").map(String);
    if (platforms.length === 0) {
      setState({
        kind: "error",
        message: "アプリを1つ以上選択してください。",
        field: "platforms",
      });
      document.querySelector<HTMLInputElement>('input[name="platforms"]')?.focus();
      return;
    }

    setState({ kind: "sending" });

    const params = new URLSearchParams(window.location.search);
    const payload = {
      activityStage: String(formData.get("activityStage") || ""),
      platforms,
      concern: String(formData.get("concern") || ""),
      contactMethod: "email",
      contactValue: String(formData.get("contactValue") || ""),
      consentAccepted: formData.get("consentAccepted") === "true",
      source: "website",
      website: String(formData.get("website") || ""),
      utm: {
        source: params.get("utm_source") || undefined,
        medium: params.get("utm_medium") || undefined,
        campaign: params.get("utm_campaign") || undefined,
        content: params.get("utm_content") || undefined,
      },
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "idempotency-key": (idempotencyKey.current ??= crypto.randomUUID()),
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        preview?: boolean;
        leadId?: string;
        error?: string;
        fields?: Record<string, string[]>;
      };

      if (!response.ok || !result.ok || !result.leadId) {
        if (response.status === 422) {
          const contactError = result.fields?.contactValue?.[0];
          setState({
            kind: "error",
            message: contactError || "入力内容をもう一度確認してください。",
            field: contactError ? "contactValue" : undefined,
          });
          return;
        }
        throw new Error(result.error || "SUBMIT_FAILED");
      }

      track("lead_submit", {
        preview: Boolean(result.preview),
        contactMethod: payload.contactMethod,
      });
      setState({
        kind: "success",
        preview: Boolean(result.preview),
        leadId: result.leadId,
      });
    } catch (error) {
      const rateLimited = error instanceof Error && error.message === "RATE_LIMITED";
      setState({
        kind: "error",
        message: rateLimited
          ? "短時間に送信が集中しています。少し時間を置いてください。"
          : "送信できませんでした。LINEからご相談ください。",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div ref={successRef} className="form-success" role="status" tabIndex={-1}>
        <span className="form-success__mark" aria-hidden="true">✓</span>
        <h3>{state.preview ? "プレビュー送信を確認しました" : "相談を受け付けました"}</h3>
        <p>
          {state.preview
            ? "現在はデザイン確認用のため、入力内容は保存されていません。"
            : "担当者からご希望の方法で連絡します。受付番号は大切に保管してください。"}
        </p>
        <code>{state.leadId}</code>
      </div>
    );
  }

  return (
    <form
      className="lead-form"
      onFocusCapture={markStarted}
      action={async (formData) => {
        await submit(formData);
      }}
    >
      <div className="field">
        <label htmlFor="activityStage">現在の状況</label>
        <select id="activityStage" name="activityStage" required defaultValue="">
          <option value="" disabled>選択してください</option>
          <option value="not-started">まだ配信していない</option>
          <option value="just-started">始めたばかり</option>
          <option value="active">現在活動している</option>
          <option value="considering-transfer">移籍を検討している</option>
        </select>
      </div>

      <fieldset
        className="field"
        aria-required="true"
        aria-describedby={state.kind === "error" && state.field === "platforms" ? "form-error" : undefined}
      >
        <legend>利用中・検討中のアプリ</legend>
        <div className="choice-grid">
          {platformOptions.map((platform) => (
            <label className="choice" key={platform}>
              <input type="checkbox" name="platforms" value={platform} />
              <span>{platform}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="concern">相談したいこと</label>
        <textarea
          id="concern"
          name="concern"
          minLength={10}
          maxLength={600}
          rows={5}
          required
          placeholder="例：配信は始めたものの、話題が続かず伸ばし方が分かりません。"
        />
        <small>個人を特定できる情報やパスワードは入力しないでください。</small>
      </div>

      <div className="field">
        <label htmlFor="contactValue">返信先メールアドレス</label>
        <input
          id="contactValue"
          name="contactValue"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={state.kind === "error" && state.field === "contactValue"}
          aria-describedby={state.kind === "error" && state.field === "contactValue" ? "form-error" : undefined}
          required
          maxLength={160}
        />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Webサイト</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input name="consentAccepted" value="true" type="checkbox" required />
        <span>
          相談対応のために入力情報を利用することと、
          <a href="/privacy" target="_blank">プライバシーポリシー</a>に同意します。
        </span>
      </label>

      {state.kind === "error" && <p id="form-error" className="form-error" role="alert">{state.message}</p>}

      <button className="button button--dark button--full" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "送信しています…" : "相談内容を送る"}
      </button>
    </form>
  );
}
