"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { ROLE_LABELS } from "@/domain/permissions";
import { signOutAction } from "@/app/admin/(protected)/actions";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/domain/entities";

interface AdminTopbarProps {
  user: AdminUser;
}

interface MenuConfig {
  id: "create" | "profile" | null;
}

/** Admin top bar: mobile nav, search placeholder, quick-create, notifications, profile menu. */
export function AdminTopbar({ user }: AdminTopbarProps) {
  const [menu, setMenu] = useState<MenuConfig["id"]>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <header
      ref={containerRef}
      className="border-border bg-canvas/95 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur sm:px-6"
    >
      <AdminMobileNav user={user} />

      <div className="relative hidden flex-1 sm:block sm:max-w-md">
        <Icon
          name="Search"
          className="text-text-tertiary pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          aria-hidden
        />
        <input
          type="search"
          placeholder="Search restaurants, menus, QR…"
          aria-label="Search (placeholder)"
          className="border-input-border bg-surface text-small text-text-primary placeholder:text-text-tertiary focus-visible:border-primary focus-visible:outline-primary h-10 w-full rounded-[12px] border pr-3 pl-9 focus-visible:outline-2 focus-visible:outline-offset-1"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
        {/* Quick-create */}
        <div className="relative">
          <Button
            type="button"
            size="sm"
            onClick={() => setMenu((m) => (m === "create" ? null : "create"))}
            aria-haspopup="menu"
            aria-expanded={menu === "create"}
          >
            <Icon name="Plus" className="size-4" aria-hidden />
            <span className="hidden sm:inline">Create</span>
          </Button>
          {menu === "create" ? (
            <div
              role="menu"
              className="border-border bg-canvas shadow-lift absolute top-full right-0 z-40 mt-2 w-56 rounded-[12px] border p-1.5"
            >
              <Link
                role="menuitem"
                href={routes.admin.restaurantNew()}
                className="text-small text-text-primary hover:bg-surface flex min-h-11 items-center gap-2.5 rounded-[10px] px-3"
              >
                <Icon name="Store" className="text-primary size-4" aria-hidden />
                New restaurant
              </Link>
              <Link
                role="menuitem"
                href={routes.admin.restaurants()}
                className="text-small text-text-primary hover:bg-surface flex min-h-11 items-center gap-2.5 rounded-[10px] px-3"
              >
                <Icon name="ListChecks" className="text-text-secondary size-4" aria-hidden />
                View all restaurants
              </Link>
            </div>
          ) : null}
        </div>

        {/* Notifications (placeholder) */}
        <button
          type="button"
          className="border-border bg-canvas text-text-secondary hover:bg-surface focus-visible:outline-primary relative flex size-10 items-center justify-center rounded-[10px] border focus-visible:outline-2 focus-visible:outline-offset-2"
          aria-label="Notifications (none)"
        >
          <Icon name="Bell" className="size-5" aria-hidden />
        </button>

        {/* Profile menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenu((m) => (m === "profile" ? null : "profile"))}
            aria-haspopup="menu"
            aria-expanded={menu === "profile"}
            className="border-border bg-canvas hover:bg-surface focus-visible:outline-primary flex min-h-10 items-center gap-2 rounded-[10px] border px-2 py-1 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="bg-navy flex size-8 items-center justify-center rounded-full text-xs font-bold text-white">
              {user.displayName.slice(0, 2).toUpperCase()}
            </span>
            <span className="hidden text-left sm:block">
              <span className="text-small text-text-primary block font-semibold">
                {user.displayName}
              </span>
              <span className="text-text-secondary block text-xs">{ROLE_LABELS[user.role]}</span>
            </span>
            <Icon name="ChevronDown" className="text-text-tertiary size-4" aria-hidden />
          </button>
          {menu === "profile" ? (
            <div
              role="menu"
              className="border-border bg-canvas shadow-lift absolute top-full right-0 z-40 mt-2 w-60 rounded-[12px] border p-1.5"
            >
              <div className="border-border border-b px-3 py-2.5">
                <p className="text-small text-text-primary font-semibold">{user.displayName}</p>
                <p className="text-text-secondary truncate text-xs">{user.email}</p>
              </div>
              <Link
                role="menuitem"
                href={routes.admin.settings()}
                className="text-small text-text-primary hover:bg-surface mt-1 flex min-h-11 items-center gap-2.5 rounded-[10px] px-3"
              >
                <Icon name="Settings" className="text-text-secondary size-4" aria-hidden />
                Settings
              </Link>
              <Link
                role="menuitem"
                href={routes.admin.account()}
                className="text-small text-text-primary hover:bg-surface flex min-h-11 items-center gap-2.5 rounded-[10px] px-3"
              >
                <Icon name="KeyRound" className="text-text-secondary size-4" aria-hidden />
                Change password
              </Link>
              <form action={signOutAction} className="mt-1">
                <button
                  type="submit"
                  role="menuitem"
                  className={cn(
                    "text-small text-danger hover:bg-danger/5 flex min-h-11 w-full items-center gap-2.5 rounded-[10px] px-3 text-left font-medium",
                  )}
                >
                  <Icon name="LogOut" className="size-4" aria-hidden />
                  Sign out
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
