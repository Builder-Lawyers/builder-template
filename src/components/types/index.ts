export interface HeaderProps {
  title: string;
  navigation: Array<{
    label: string;
    href: string;
  }>;
  buttons?: Array<{
    label: string;
    href: string;
  }>;
}

export type WidgetMap = {
  header: HeaderProps;
};
