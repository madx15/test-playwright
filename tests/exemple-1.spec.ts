import { test, expect } from '@playwright/test';

test('exemple 1 - recherche fc barcelone sur google.com', async ({ page }) => {
  // Accéder à la page d'accueil de Google
  await page.goto('https://www.google.com/');

  // Accepter les cookies si la bannière de consentement est présente
  const acceptButton = page.getByRole('button', { name: /accepter tout|accept all/i });
  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  }

  // Écrire "fc barcelone" dans la barre de recherche
  const searchBox = page.getByRole('combobox', { name: /rechercher|search/i });
  await searchBox.fill('fc barcelone');
  await searchBox.press('Enter');

  // Vérifier que la page de recherche a bien été rechargée avec les résultats
  await expect(page).toHaveURL(/search\?.*q=fc\+barcelone/i);
});
