import { useState, useEffect, useCallback } from "react";

const REG_EVENTS_KEY = "yuva-2026-reg-events";
const REG_WORKSHOPS_KEY = "yuva-2026-reg-workshops";

export function getRegisteredEvents(userId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(REG_EVENTS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed[userId] || [];
  } catch {
    return [];
  }
}

export function registerForEvent(userId: string, eventId: string) {
  if (typeof window === "undefined") return;
  try {
    const data = window.localStorage.getItem(REG_EVENTS_KEY);
    const parsed = data ? JSON.parse(data) : {};
    const userRegs = parsed[userId] || [];
    if (!userRegs.includes(eventId)) {
      userRegs.push(eventId);
      parsed[userId] = userRegs;
      window.localStorage.setItem(REG_EVENTS_KEY, JSON.stringify(parsed));
      window.dispatchEvent(new Event("yuva-registration-change"));
    }
  } catch (e) {
    console.error(e);
  }
}

export function unregisterFromEvent(userId: string, eventId: string) {
  if (typeof window === "undefined") return;
  try {
    const data = window.localStorage.getItem(REG_EVENTS_KEY);
    const parsed = data ? JSON.parse(data) : {};
    const userRegs = parsed[userId] || [];
    const filtered = userRegs.filter((id: string) => id !== eventId);
    parsed[userId] = filtered;
    window.localStorage.setItem(REG_EVENTS_KEY, JSON.stringify(parsed));
    window.dispatchEvent(new Event("yuva-registration-change"));
  } catch (e) {
    console.error(e);
  }
}

export function getRegisteredWorkshops(userId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(REG_WORKSHOPS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed[userId] || [];
  } catch {
    return [];
  }
}

export function registerForWorkshop(userId: string, workshopId: string) {
  if (typeof window === "undefined") return;
  try {
    const data = window.localStorage.getItem(REG_WORKSHOPS_KEY);
    const parsed = data ? JSON.parse(data) : {};
    const userRegs = parsed[userId] || [];
    if (!userRegs.includes(workshopId)) {
      userRegs.push(workshopId);
      parsed[userId] = userRegs;
      window.localStorage.setItem(REG_WORKSHOPS_KEY, JSON.stringify(parsed));
      window.dispatchEvent(new Event("yuva-registration-change"));
    }
  } catch (e) {
    console.error(e);
  }
}

export function unregisterFromWorkshop(userId: string, workshopId: string) {
  if (typeof window === "undefined") return;
  try {
    const data = window.localStorage.getItem(REG_WORKSHOPS_KEY);
    const parsed = data ? JSON.parse(data) : {};
    const userRegs = parsed[userId] || [];
    const filtered = userRegs.filter((id: string) => id !== workshopId);
    parsed[userId] = filtered;
    window.localStorage.setItem(REG_WORKSHOPS_KEY, JSON.stringify(parsed));
    window.dispatchEvent(new Event("yuva-registration-change"));
  } catch (e) {
    console.error(e);
  }
}

export function useRegistrations(userId?: string) {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [registeredWorkshops, setRegisteredWorkshops] = useState<string[]>([]);

  const refresh = useCallback(() => {
    if (!userId) {
      setRegisteredEvents([]);
      setRegisteredWorkshops([]);
      return;
    }
    setRegisteredEvents(getRegisteredEvents(userId));
    setRegisteredWorkshops(getRegisteredWorkshops(userId));
  }, [userId]);

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("yuva-registration-change", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("yuva-registration-change", refresh);
    };
  }, [refresh]);

  return {
    registeredEvents,
    registeredWorkshops,
    refresh,
  };
}
