import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from './button';

interface HelpBubbleProps {
  title?: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function HelpBubble({ 
  title, 
  content, 
  position = 'top', 
  trigger = 'hover',
  size = 'md',
  className = '' 
}: HelpBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);

  const showBubble = () => setIsVisible(true);
  const hideBubble = () => setIsVisible(false);

  const sizeClasses = {
    sm: 'w-48 text-xs',
    md: 'w-64 text-sm',
    lg: 'w-80 text-sm'
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800'
  };

  const triggerProps = trigger === 'hover' ? {
    onMouseEnter: showBubble,
    onMouseLeave: hideBubble
  } : {
    onClick: () => setIsVisible(!isVisible)
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        {...triggerProps}
        className="inline-flex items-center justify-center cursor-help"
      >
        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
      </div>
      
      {isVisible && (
        <>
          {/* Backdrop for click trigger */}
          {trigger === 'click' && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={hideBubble}
            />
          )}
          
          {/* Help bubble */}
          <div className={`absolute z-50 ${positionClasses[position]} ${sizeClasses[size]}`}>
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-3 relative">
              {/* Close button for click trigger */}
              {trigger === 'click' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 h-5 w-5 p-0 text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={hideBubble}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              
              {title && (
                <div className="font-medium text-white mb-1 pr-6">
                  {title}
                </div>
              )}
              
              <div className="text-gray-200 leading-relaxed">
                {content}
              </div>
              
              {/* Arrow */}
              <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}