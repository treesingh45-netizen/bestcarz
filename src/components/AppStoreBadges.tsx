import React from 'react';

interface AppStoreBadgesProps {
  onBadgeClick?: (platform: 'android' | 'ios') => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AppStoreBadges: React.FC<AppStoreBadgesProps> = ({
  onBadgeClick,
  className = '',
  size = 'md',
}) => {
  const handleClick = (platform: 'android' | 'ios') => {
    if (onBadgeClick) {
      onBadgeClick(platform);
    }
  };

  const isSmall = size === 'sm';

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {/* Google Play Badge */}
      <button
        type="button"
        onClick={() => handleClick('android')}
        className={`bg-black hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white rounded-lg transition-all text-left flex items-center gap-2.5 shadow-sm active:scale-98 ${
          isSmall ? 'px-2.5 py-1.5' : 'px-3.5 py-2'
        }`}
        title="Get BEST CARz on Google Play"
        aria-label="Get it on Google Play"
      >
        {/* Official-style Google Play 4-color triangle vector */}
        <svg
          viewBox="0 0 512 512"
          className={`${isSmall ? 'w-5 h-5' : 'w-6 h-6'} shrink-0`}
          aria-hidden="true"
        >
          <path
            fill="#00E676"
            d="M325.3 234.3L104.6 13l220.7 221.3z"
          />
          <path
            fill="#FFD400"
            d="M26 18.2C16.8 28.5 11 44.5 11 65.5v381c0 21 5.8 37 15 47.3l2.4 2.4 213.2-213.2v-5L28.4 15.8l-2.4 2.4z"
          />
          <path
            fill="#FF334B"
            d="M325.3 277.7l-83.7-83.7L28.4 496.2c9.5 10.1 25.1 11.2 43.1 1.2l253.8-219.7z"
          />
          <path
            fill="#0086F8"
            d="M482.4 227.6L368.5 162 325.3 205.2l43.2 43.2 113.9 65.6c19.8 11.4 34.6 4.7 34.6-18.2.1-13-8.8-25.5-24.6-34.6v-23.6z"
          />
          <path
            fill="#00C2FF"
            d="M482.4 227.6l-113.9-65.6L104.6 13C86.6 3 71 4.1 61.5 14.2l263.8 263.5 157.1-50.1z"
          />
        </svg>

        <div className="flex flex-col leading-tight">
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-medium leading-none">
            GET IT ON
          </span>
          <span className={`${isSmall ? 'text-xs' : 'text-[13px] sm:text-sm'} font-semibold text-white font-sans tracking-tight mt-0.5`}>
            Google Play
          </span>
        </div>
      </button>

      {/* Apple App Store Badge */}
      <button
        type="button"
        onClick={() => handleClick('ios')}
        className={`bg-black hover:bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white rounded-lg transition-all text-left flex items-center gap-2.5 shadow-sm active:scale-98 ${
          isSmall ? 'px-2.5 py-1.5' : 'px-3.5 py-2'
        }`}
        title="Download BEST CARz on the Apple App Store"
        aria-label="Download on the App Store"
      >
        {/* Apple Logo Silhouette Vector */}
        <svg
          viewBox="0 0 170 170"
          className={`${isSmall ? 'w-5 h-5' : 'w-6 h-6'} shrink-0 fill-current text-white`}
          aria-hidden="true"
        >
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.6-7.85-11.75-14.43-5.78-9.01-10.23-19.53-13.35-31.55-3.12-12.01-4.68-23.36-4.68-34.04 0-14.45 3.65-26.4 10.95-35.85 7.3-9.45 16.59-14.28 27.87-14.49 4.35 0 9.42 1.15 15.21 3.45 5.79 2.3 9.49 3.5 11.11 3.6 2.3.11 6.34-1.28 12.13-4.17 5.79-2.89 11.12-4.22 16-4 12.18.64 22.18 4.96 29.98 12.95-10.59 6.42-15.75 15.42-15.5 27 .25 9.17 3.82 16.92 10.71 23.23 6.9 6.31 15.13 9.9 24.71 10.77-2.14 6.72-4.8 13.59-7.97 20.61zM119.22 31.84c0-7.39 2.65-14.42 7.95-21.09 5.3-6.67 11.89-10.48 19.77-11.43.11 1.09.16 2.07.16 2.94 0 7.39-2.82 14.53-8.46 21.42-5.64 6.89-12.44 10.74-20.4 11.55-.33-1.09-.5-2.23-.5-3.39z" />
        </svg>

        <div className="flex flex-col leading-tight">
          <span className="text-[9px] text-zinc-400 font-medium leading-none">
            Download on the
          </span>
          <span className={`${isSmall ? 'text-xs' : 'text-[13px] sm:text-sm'} font-semibold text-white font-sans tracking-tight mt-0.5`}>
            App Store
          </span>
        </div>
      </button>
    </div>
  );
};
