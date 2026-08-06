import { useEffect } from 'react';

/**
 * Tawk.to Chat Widget Component - SMS SALON
 *
 * YOUR SITE ID: 693757e749fc3e19817659a1
 * YOUR WIDGET ID: 1jc02unmr
 * WEBSITE: SMS Salon
 *
 * This component is configured and ready to use!
 * Just import it and add to your App.tsx
 */

interface ChatWidgetProps {
  // Optional: Override site ID if needed
  siteId?: string;
}

/**
 * The slice of Tawk's global API this component touches. Tawk ships no types,
 * so this is the contract we rely on — extend it rather than reaching for `any`.
 */
interface TawkApi {
  isChatInitialized?: boolean;
  onLoad?: () => void;
  onStatusChange?: (status: string) => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onMessageSent?: () => void;
  onMessageReceived?: () => void;
}

interface TawkWindow extends Window {
  Tawk_API?: TawkApi;
  Tawk_LoadStart?: Date;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  siteId = '693757e749fc3e19817659a1' // Your SMS Salon Site ID ✅
}) => {
  useEffect(() => {
    // Initialize Tawk API
    const tawkWindow = window as TawkWindow;

    // Set up Tawk_API and event handlers BEFORE loading script
    const tawkApi: TawkApi = tawkWindow.Tawk_API || {};
    tawkWindow.Tawk_API = tawkApi;
    tawkWindow.Tawk_LoadStart = new Date();

    // Set up event handlers first
    tawkApi.onLoad = () => {
      console.log('✅ Tawk.to chat widget loaded successfully!');
    };

    tawkApi.onStatusChange = (status: string) => {
      console.log('🔔 Tawk status changed:', status);
    };

    tawkApi.onChatMaximized = () => {
      console.log('💬 Chat window opened');
    };

    tawkApi.onChatMinimized = () => {
      console.log('💬 Chat window closed');
    };

    tawkApi.onMessageSent = () => {
      console.log('📤 Message sent');
    };

    tawkApi.onMessageReceived = () => {
      console.log('📥 Message received');
    };

    // Load Tawk script
    const loadTawkScript = () => {
      const s1 = document.createElement('script');
      const s0 = document.getElementsByTagName('script')[0];

      s1.async = true;
      s1.src = `https://embed.tawk.to/${siteId}/1jc02unmr`; // Your widget ID
      s1.setAttribute('crossorigin', '*');

      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.body.appendChild(s1);
      }
      console.log('📢 Tawk script loading...');
    };

    // Only load if not already loaded
    if (!tawkApi.isChatInitialized) {
      loadTawkScript();
    }

    return () => {
      // Cleanup (optional)
    };
  }, [siteId]);

  return null; // Tawk widget renders itself
};

export default ChatWidget;