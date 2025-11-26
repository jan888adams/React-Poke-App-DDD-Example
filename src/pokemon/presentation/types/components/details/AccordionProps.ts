export type AccordionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onFetch?: () => void;
  columns: (string | null)[];
  items: (string | null)[][];
};
