import { mkdirSync, appendFileSync, readFileSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

/**
 * Submissions data store.
 *
 * This is an append-only NDJSON file (one JSON record per line) under ./data.
 * It needs no native build step or external service, so it runs anywhere.
 *
 * To move to Postgres / MySQL / SQLite later, reimplement insertSubmission and
 * listSubmissions against your driver — the rest of the app only uses these two
 * functions and the Submission types, so nothing else changes.
 */

export interface SubmissionInput {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  locations: string;
  volume: string;
  interest: string;
  message: string;
}

export interface Submission extends SubmissionInput {
  id: string;
  createdAt: string; // ISO timestamp
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "submissions.ndjson");

function ensureDir() {
  mkdirSync(DATA_DIR, { recursive: true });
}

export function insertSubmission(input: SubmissionInput): Submission {
  ensureDir();
  const record: Submission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  appendFileSync(DB_FILE, JSON.stringify(record) + "\n", "utf8");
  return record;
}

export function listSubmissions(): Submission[] {
  if (!existsSync(DB_FILE)) return [];
  const lines = readFileSync(DB_FILE, "utf8").split("\n").filter(Boolean);
  const rows: Submission[] = [];
  for (const line of lines) {
    try {
      rows.push(JSON.parse(line) as Submission);
    } catch {
      // skip a corrupt line rather than failing the whole export
    }
  }
  // newest first
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
