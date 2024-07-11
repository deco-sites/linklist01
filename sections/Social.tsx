import { JSX } from "preact";
import { Social } from "../components/types.ts";
import Icon from "../components/ui/Icon.tsx";

export interface Props {
  social?: Social[];
}

export default function Main(
  {
    social = [
      { label: "Discord", href: "/" },
      { label: "Facebook", href: "/" },
      { label: "Instagram", href: "/" },
      { label: "Linkedin", href: "/" },
      { label: "Tiktok", href: "/" },
      { label: "Twitter", href: "/" },
      { label: "WhatsApp", href: "/" },
    ],
  }: Props,
): JSX.Element | null {
  return (
    <div class="flex flex-col items-center max-w-[688px] mx-auto w-full lg:px-0 px-6">
      {social && social?.length > 0 && (
        <ul class="flex flex-row gap-4 items-center justify-center my-8">
          {social?.map((link) => (
            <li>
              <a
                target="_blank"
                href={link.href}
                title={link.label}
              >
                <Icon
                  size={20}
                  id={link.label}
                  strokeWidth={2}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
