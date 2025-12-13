/**
 * Content Loader Utility
 * Loads and validates JSON content from edit_content/pages directory
 */

type PageName = 'home' | 'about' | 'buyers' | 'sellers' | 'contact';

/**
 * Asynchronously load page content from JSON
 * @param pageName - Name of the page (without .json extension)
 * @returns Promise resolving to the JSON data or null if load fails
 */
export async function loadPageContent(pageName: PageName) {
  try {
    const module = await import(`../../edit_content/pages/${pageName}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load ${pageName}.json:`, error);
    return null;
  }
}

/**
 * Synchronously load page content from JSON (for build-time or SSR)
 * @param pageName - Name of the page (without .json extension)
 * @returns The JSON data or null if load fails
 */
export function loadPageContentSync(pageName: PageName) {
  try {
    // Using require for synchronous loading
    return require(`../../edit_content/pages/${pageName}.json`);
  } catch (error) {
    console.error(`Failed to load ${pageName}.json:`, error);
    return null;
  }
}

/**
 * Get a nested value from content object with fallback
 * @param obj - The object to search
 * @param path - Dot-separated path (e.g., 'hero.title')
 * @param fallback - Fallback value if path not found
 * @returns The value at path or fallback
 */
export function getContentValue(obj: any, path: string, fallback: any = '') {
  if (!obj) return fallback;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback;
    }
  }
  
  return current || fallback;
}
