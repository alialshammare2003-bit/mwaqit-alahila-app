import { getAccessToken } from '../firebase';

export interface CalendarEventPayload {
  summary: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD (exclusive for all-day)
  location?: string;
}

export interface GoogleCalendarItem {
  id: string;
  summary: string;
  description?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  htmlLink?: string;
}

/**
 * List upcoming calendar events from the user's primary Google Calendar
 */
export async function listCalendarEvents(): Promise<GoogleCalendarItem[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('لم يتم العثور على رمز الوصول (Access Token). يرجى تسجيل الدخول بحساب Google أولاً.');
  }

  const timeMin = new Date('2026-01-01T00:00:00Z').toISOString();
  const timeMax = new Date('2027-12-31T23:59:59Z').toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(
    timeMin
  )}&timeMax=${encodeURIComponent(timeMax)}&maxResults=100&orderBy=startTime&singleEvents=true`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'فشل في استرداد أحداث تقويم Google');
  }

  const data = await response.json();
  return data.items || [];
}

/**
 * Add an event to the primary Google Calendar
 */
export async function createCalendarEvent(payload: CalendarEventPayload): Promise<GoogleCalendarItem> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('يرجى تسجيل الدخول بحساب Google لمزامنة الحدث مع تقويمك.');
  }

  // Next day for all-day end
  const startD = new Date(payload.startDate);
  const endD = payload.endDate ? new Date(payload.endDate) : new Date(startD.getTime() + 24 * 60 * 60 * 1000);
  const endDateStr = endD.toISOString().split('T')[0];

  const body = {
    summary: payload.summary,
    description: `${payload.description}\n\n[تمت المزامنة من تطبيق مواقيت الأهلة لعام 1448 هـ - أفق النجف الأشرف]`,
    location: payload.location || 'النجف الأشرف / العراق',
    start: {
      date: payload.startDate,
    },
    end: {
      date: endDateStr,
    },
    transparency: 'transparent', // Free time for reminders
  };

  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'فشل في إضافة الحدث إلى تقويم Google');
  }

  return await response.json();
}

/**
 * Delete an event from Google Calendar (MUST have user confirmation before calling)
 */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('يرجى تسجيل الدخول بحساب Google.');
  }

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${encodeURIComponent(eventId)}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok && response.status !== 404 && response.status !== 410) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'فشل في حذف الحدث من تقويم Google');
  }
}
