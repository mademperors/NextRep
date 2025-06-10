import { DNA } from 'react-loader-spinner';
import { cn } from '~/lib/utils';

interface DnaLoaderProps {
  visible?: boolean;
  height?: number;
  width?: number;
  ariaLabel?: string;
  wrapperClass?: string;
  className?: string;
}

export function DnaLoader({
  visible = true,
  height = 80,
  width = 80,
  ariaLabel = 'DNA loading',
  wrapperClass = '',
  className,
}: DnaLoaderProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <DNA
        visible={visible}
        height={height}
        width={width}
        ariaLabel={ariaLabel}
        wrapperClass={wrapperClass}
      />
    </div>
  );
}

export function FullScreenDnaLoader({
  visible = true,
  height = 100,
  width = 100,
  ariaLabel = 'Loading...',
}: Omit<DnaLoaderProps, 'className' | 'wrapperClass'>) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <DnaLoader
        visible={visible}
        height={height}
        width={width}
        ariaLabel={ariaLabel}
        className="flex flex-col items-center gap-4"
      />
    </div>
  );
}

export function InlineDnaLoader({
  visible = true,
  height = 40,
  width = 40,
  ariaLabel = 'Loading...',
  className,
}: DnaLoaderProps) {
  if (!visible) return null;

  return (
    <DnaLoader
      visible={visible}
      height={height}
      width={width}
      ariaLabel={ariaLabel}
      className={cn('py-4', className)}
    />
  );
}

