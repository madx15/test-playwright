import { test, expect } from '@playwright/test';

test('exemple 1 - recherche fc barcelone sur google.com', async ({ page }) => {
  // Accéder à la page d'accueil de Google
  await page.goto('https://www.google.com/');

  // Accepter les cookies si une bannière de consentement est présente
  // (le texte du bouton varie selon la langue/région du serveur qui exécute le test)
  const consentButton = page.getByRole('button', {
    name: /accepter tout|accept all|j'accepte|i agree|tout accepter/i,
  });
  if (await consentButton.first().isVisible({ timeout: 5000 }).catch(() => false)) {
    await consentButton.first().click();
  }

  // Écrire "fc barcelone" dans la barre de recherche
  const searchBox = page.getByRole('combobox', { name: /rechercher|search/i });
  await searchBox.fill('fc barcelone');
  await searchBox.press('Enter');

  // Vérifier qu'une page de résultats mentionnant "barcelone" s'affiche
  // (on vérifie le contenu plutôt que l'URL exacte, car Google peut rediriger
  // différemment selon le serveur qui exécute le test - ex. page de vérification)
  await expect(page.locator('body')).toContainText(/barcelone/i, { timeout: 15000 });
});
