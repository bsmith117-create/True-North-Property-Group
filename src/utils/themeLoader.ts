/**
 * Theme Loader Utility
 * Loads theme configuration from theme.json and dynamically updates Tailwind config
 */

interface ThemeConfig {
  colors: {
    brandColors: {
      primary: string;
      secondary: string;
    };
    neutrals: {
      darkNeutral: string;
      lightNeutral: string;
      secondaryNeutral: string;
    };
  };
  typography: {
    textFont: {
      fontFamily: string;
      fontFallback: string;
    };
  };
}

/**
 * Load theme configuration from theme.json
 * @returns Promise<ThemeConfig | null>
 */
export async function loadThemeConfig(): Promise<ThemeConfig | null> {
  try {
    const response = await fetch('/edit_content/theme/theme.json');
    if (!response.ok) {
      throw new Error(`Failed to load theme.json: ${response.statusText}`);
    }
    const themeConfig: ThemeConfig = await response.json();
    return themeConfig;
  } catch (error) {
    console.error('Failed to load theme configuration:', error);
    return null;
  }
}

/**
 * Generate Tailwind config object from theme JSON
 * @param themeConfig - Theme configuration object
 * @returns Tailwind config colors and fonts
 */
export function generateTailwindConfig(themeConfig: ThemeConfig) {
  if (!themeConfig) {
    return {
      colors: {},
      fontFamily: {}
    };
  }

  return {
    colors: {
      // Primary brand colors
      'tn-teal': themeConfig.colors.brandColors.primary,
      'tn-brown': themeConfig.colors.brandColors.secondary,

      // Brand neutrals
      'tn-black': themeConfig.colors.neutrals.darkNeutral,
      'tn-white': themeConfig.colors.neutrals.lightNeutral,
      'tn-gray': themeConfig.colors.neutrals.secondaryNeutral,

      // Legacy aliases for backward compatibility
      'tn-light': themeConfig.colors.neutrals.lightNeutral,
      'tn-dark': themeConfig.colors.neutrals.darkNeutral,
    },
    fontFamily: {
      sans: [themeConfig.typography.textFont.fontFamily, themeConfig.typography.textFont.fontFallback]
    }
  };
}

/**
 * Apply theme configuration to Tailwind dynamically
 * Call this in your main app initialization
 */
export async function initializeTheme() {
  try {
    const themeConfig = await loadThemeConfig();
    if (!themeConfig) {
      console.warn('Using default theme configuration');
      return;
    }

    const tailwindConfig = generateTailwindConfig(themeConfig);

    // Update Tailwind config dynamically
    if (window.tailwind && window.tailwind.config) {
      window.tailwind.config = {
        theme: {
          extend: tailwindConfig
        }
      };
      console.log('Theme configuration loaded successfully:', themeConfig);
    }
  } catch (error) {
    console.error('Failed to initialize theme:', error);
  }
}

/**
 * Type declaration for window.tailwind
 */
declare global {
  interface Window {
    tailwind?: {
      config?: any;
    };
  }
}
