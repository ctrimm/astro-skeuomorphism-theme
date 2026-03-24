import { useCallback, useEffect, useRef } from "react";
import { Howl } from "howler";

// Sound assets - using generic placeholder URLs that would typically be replaced by real assets
// For this implementation, we'll try to use reliable CDNs or base64 if possible
// BUT, since we don't have files, we might need to rely on the user adding them OR use short synthesized sounds if possible?
// The prompt implies we should just implement the design. I will assume "public/sounds/" exists or will be created.
// I'll create a script to generate some dummy sounds or just point to expected paths.

const SOUND_PATHS = {
  click: "/sounds/click.mp3",
  clack: "/sounds/clack.mp3",
  switchOn: "/sounds/switch-on.mp3",
  switchOff: "/sounds/switch-off.mp3",
  hover: "/sounds/hover.mp3",
  powerOn: "/sounds/power-on.mp3",
};

type SoundType = keyof typeof SOUND_PATHS;

export const useSkeuoSound = () => {
  const soundsRef = useRef<Record<string, Howl>>({});
  const isMutedRef = useRef(true); // Start muted to avoid errors
  const isInitialized = useRef(false);

  useEffect(() => {
    // Don't preload sounds - only load on first interaction
    return () => {
      Object.values(soundsRef.current).forEach(sound => sound.unload());
    };
  }, []);

  const play = useCallback((type: SoundType, volume = 0.5) => {
    // Silently fail if muted or sound doesn't exist
    if (isMutedRef.current) return;

    try {
      // Lazy load sound on first play
      if (!soundsRef.current[type]) {
        soundsRef.current[type] = new Howl({
          src: [SOUND_PATHS[type]],
          volume: volume,
          preload: false,
          onloaderror: () => {
            // Silently handle load errors
            console.debug(`Sound ${type} not found - skipping`);
          },
        });
      }

      const sound = soundsRef.current[type];
      if (sound && sound.state() === 'loaded') {
        // Small pitch randomization for realism
        sound.rate(0.9 + Math.random() * 0.2);
        sound.volume(volume);
        sound.play();
      }
    } catch (error) {
      // Silently handle any errors
      console.debug(`Error playing sound ${type}:`, error);
    }
  }, []);

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current;
    return isMutedRef.current;
  }, []);

  return { play, toggleMute };
};
