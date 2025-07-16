export interface HeroProps {
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
