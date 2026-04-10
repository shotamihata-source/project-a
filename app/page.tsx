"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "numpad-typer-templates-v1";
const THEME_STORAGE_KEY = "numpad-typer-theme-v1";

const defaultTemplates = {
  0: "お世話になっております。\n",
  1: "ご連絡ありがとうございます。\n",
  2: "下記、ご確認をお願いいたします。\n",
  3: "日程候補は以下の通りです。\n",
  4: "本件、承知いたしました。\n",
  5: "ご不明点があればお知らせください。\n",
  6: "引き続きよろしくお願いいたします。\n",
  7: "本日の議事録を共有します。\n",
  8: "お手数をおかけしますが、よろしくお願いいたします。\n",
  9: "以上、何卒よろしくお願いいたします。\n",
};