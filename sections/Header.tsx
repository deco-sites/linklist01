import { Logo } from "../components/types.ts";
import Image from "apps/website/components/Image.tsx";
import { JSX } from "preact";

export interface Props {
  /** @description 104px x 104px image recommended */
  logo?: Logo;
  /**
   * @format rich-text
   * @default Click here to tweak this text however you want.
   */
  title?: string;
  /**
   * @format rich-text
   * @default This text is entirely editable, tailor it freely.
   */
  description?: string;
}

export default function Header(
  {
    logo = {
      img:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/df52c7fe-cb9d-48a8-9652-7f6bf49737ee",
      link: "/",
    },
    title = "Click here to tweak this text however you want.",
    description = "This text is entirely editable, tailor it freely.",
  }: Props,
): JSX.Element | null {
  const logoImg = (
    <Image
      decoding="async"
      src={logo?.img || ""}
      alt={logo?.alt}
      width={logo?.width || 104}
      height={logo?.height || 104}
    />
  );

  const maybeLink = logo?.link
    ? (
      <a href={logo.link} target="_blank">
        {logoImg}
      </a>
    )
    : logo;

  return (
    <header class="flex flex-col gap-4 items-center justify-center max-w-[746px] mx-auto pt-10 w-full lg:px-0 px-6">
      {logo?.img && <div class="p-4 rounded-full">{maybeLink}</div>}
      {title && (
        <h1
          class="lg:text-6xl text-4xl text-center"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      )}
      {description && (
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      )}
    </header>
  );
}
