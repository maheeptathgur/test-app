// Brand-compliant color utilities for component badges
export const getComponentBadgeStyles = (componentType: 'agent' | 'tool' | 'workflow') => {
  const styles = {
    backgroundColor: '',
    color: '',
    hoverBackgroundColor: '',
    borderColor: ''
  };

  switch (componentType) {
    case 'agent':
      styles.backgroundColor = 'var(--theme-agent-bg)';
      styles.color = 'var(--theme-agent-text)';
      styles.hoverBackgroundColor = 'var(--theme-agent-hover)';
      styles.borderColor = 'var(--theme-agent-text)';
      break;
    case 'tool':
      styles.backgroundColor = 'var(--theme-tool-bg)';
      styles.color = 'var(--theme-tool-text)';
      styles.hoverBackgroundColor = 'var(--theme-tool-hover)';
      styles.borderColor = 'var(--theme-tool-text)';
      break;
    case 'workflow':
      styles.backgroundColor = 'var(--theme-workflow-bg)';
      styles.color = 'var(--theme-workflow-text)';
      styles.hoverBackgroundColor = 'var(--theme-workflow-hover)';
      styles.borderColor = 'var(--theme-workflow-text)';
      break;
  }

  return styles;
};

export const getComponentBadgeClasses = (componentType: 'agent' | 'tool' | 'workflow') => {
  const baseClasses = "inline-flex items-center mx-0.5 px-1.5 py-0.5 rounded text-xs font-medium align-baseline border";
  
  switch (componentType) {
    case 'agent':
      return `${baseClasses} border-opacity-30`;
    case 'tool':
      return `${baseClasses} border-opacity-30`;
    case 'workflow':
      return `${baseClasses} border-opacity-30`;
    default:
      return `${baseClasses} bg-[hsl(var(--muted))] text-gray-600 border`;
  }
};