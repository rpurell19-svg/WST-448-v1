"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";

export default function DevelopersLogin() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "20120626") {
      localStorage.setItem("dev-portal-auth", "true");
      router.push("/dev/portal");
    } else {
      setError("Invalid passcode");
      setPasscode("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-950">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-lg border border-charcoal-800 bg-charcoal-900 p-8">
            <h1 className="type-h2 text-white uppercase mb-6">Developers Portal</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="passcode" className="type-label text-concrete-300">
                  Passcode
                </label>
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError("");
                  }}
                  className="mt-2 w-full px-4 py-3 rounded-lg bg-black-950 border border-charcoal-800 text-white placeholder-concrete-500 focus:outline-none focus:border-bronze-500"
                  placeholder="Enter passcode"
                />
              </div>
              {error && <p className="text-sm text-state-error">{error}</p>}
              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 bg-bronze-500 text-black-950 font-semibold rounded-lg transition-colors duration-300 hover:bg-bronze-400"
              >
                Access Portal
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
