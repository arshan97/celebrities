export interface AccordionProps {
  data: any;
  idx: number;
  toggle: (id: number) => void;
  collapsed: number | null | undefined;
  deleteUser: (id: number) => void;
}
