export async function pdfIsBeschikbaar(url: string): Promise<boolean> {
  let response: Response;

  try {
    response = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
    });
  } catch {
    throw new Error(
      `De PDF-beschikbaarheidscontrole kon de Worker niet bereiken: ${url}`
    );
  }

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    throw new Error(
      `De PDF-beschikbaarheidscontrole is mislukt met status ${response.status}: ${url}`
    );
  }

  return true;
}