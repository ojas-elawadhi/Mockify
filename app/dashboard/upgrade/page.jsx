"use client";

import React from "react";
import PricingPlan from "../_components/PricingPlan";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";

const benefits = [
  "Expanded practice sessions",
  "Saved feedback history",
  "Role-specific question generation",
  "Audio answer review",
];

const Upgrade = () => {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <section className="panel-muted p-6 md:p-8">
        <p className="section-eyebrow">Plans</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Upgrade your interview practice.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          These checkout links are currently in Stripe test mode. Choose the
          cadence that best fits your prep timeline.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {PricingPlan.map((item) => (
          <article key={item.priceId} className="panel p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-eyebrow">{item.duration}</p>
                <h2 className="mt-3 text-3xl font-bold">
                  ${item.price}
                  <span className="text-base font-medium text-muted-foreground">
                    {" "}
                    / {item.duration.toLowerCase()}
                  </span>
                </h2>
              </div>
              <span className="rounded-md border border-warning/30 bg-warning/15 px-3 py-1 text-xs font-semibold text-warning-foreground">
                Test mode
              </span>
            </div>

            <ul className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm">
                  <span className="flex size-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="size-3.5" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Button asChild className="mt-8 w-full" size="lg">
              <a
                href={
                  item.link +
                  "?prefilled_email=" +
                  user?.primaryEmailAddress?.emailAddress
                }
                target="_blank"
                rel="noreferrer"
              >
                Continue to Checkout
                <ExternalLink />
              </a>
            </Button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Upgrade;
