import React from 'react';

interface VarenoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'light' | 'dark' | 'monochrome';
  hideWordmark?: boolean;
  withTagline?: boolean;
}

/**
 * Geometric Architectural V Symbol
 * Precision angles: 45° terminal chamfers, 68° descent, forward cantilever with lime accent
 */
export const VarenoSymbol: React.FC<{ size?: number; className?: string; variant?: 'default' | 'light' | 'monochrome' }> = ({
  size = 32,
  className = '',
  variant = 'default',
}) => {
  const isLight = variant === 'light';
  const isMono = variant === 'monochrome';

  const baseColor = isMono ? 'currentColor' : isLight ? '#11130F' : '#F5F3ED';
  const accentColor = isMono ? 'currentColor' : '#D6F36A';
  const strokeBorder = isLight ? '#DCD7CA' : '#272B22';
  const bgFill = isLight ? '#ECE9DF' : '#181B15';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-[1.03] ${className}`}
      aria-hidden="true"
    >
      {/* Precision container backdrop */}
      <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" fill={bgFill} stroke={strokeBorder} strokeWidth="1" />
      
      {/* Primary Architectural V beam - left descending stroke */}
      <path
        d="M8.5 9.5H13.2L17.8 23.2H14.2L8.5 9.5Z"
        fill={baseColor}
      />

      {/* Primary Architectural V beam - right ascending stroke */}
      <path
        d="M27.5 9.5H22.8L16.2 26.5H20.2L27.5 9.5Z"
        fill={baseColor}
      />

      {/* Forward dynamic cantilever stroke in signature Lime (#D6F36A) */}
      <polygon
        points="19.2,12.5 22.8,12.5 17.5,26.5 14.5,26.5"
        fill={accentColor}
      />

      {/* Architectural apex negative space alignment pin */}
      <rect x="16.5" y="8" width="3" height="1.5" rx="0.75" fill={accentColor} opacity="0.9" />
    </svg>
  );
};

export const VarenoWordmark: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; variant?: 'default' | 'light' | 'monochrome' }> = ({
  size = 'md',
  variant = 'default',
}) => {
  const isLight = variant === 'light';
  const textColor = variant === 'monochrome' ? 'text-current' : isLight ? 'text-[#11130F]' : 'text-[#F5F3ED]';

  const sizeClasses = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-base tracking-[0.22em]',
    lg: 'text-lg tracking-[0.24em]',
    xl: 'text-xl tracking-[0.26em]',
  };

  return (
    <span className={`font-bold uppercase select-none transition-colors duration-200 ${sizeClasses[size]} ${textColor}`}>
      VARENO
    </span>
  );
};

export const VarenoLogo: React.FC<VarenoLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'default',
  hideWordmark = false,
  withTagline = false,
}) => {
  const symbolSizes = {
    sm: 26,
    md: 32,
    lg: 40,
    xl: 48,
  };

  const symbolSize = symbolSizes[size];

  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      <VarenoSymbol size={symbolSize} variant={variant === 'light' ? 'light' : 'default'} />
      {!hideWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <VarenoWordmark size={size} variant={variant === 'light' ? 'light' : 'default'} />
          </div>
          {withTagline && (
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#9E9E94] -mt-0.5">
              Full-Stack Studio
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default VarenoLogo;
