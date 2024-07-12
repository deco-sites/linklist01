import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";
import type { SectionProps } from "deco/mod.ts";
import { toFileUrl } from "std/path/mod.ts";
import type { HTMLWidget } from 'apps/admin/widgets.ts';

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format rich-text
   * @title Input Placeholder
   */
  inputPlaceholder?: string;
  /**
   * @format rich-text
   * @title Button Text
   */
  buttonText?: string;
  content?: HTMLWidget;
}

const ROOT = toFileUrl(Deno.cwd()).href;

const useCustomComponent = <T = Record<string, unknown>>(
  component: string,
  props?: T,
  otherProps: { href?: string } = {},
) => useSection({
  ...otherProps,
  props: {
    props,
    component: component.replace(ROOT, ""),
    __resolveType: "site/sections/Component.tsx",
  },
});

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const response = `${form.get("response") ?? ""}`;
  if (!response) {
    return { ...props, content: { "You didn't answer." } };
  }
  return { ...props, content: { `You answered: ${response}` }
};
}

export function loader(props: Props) {
  return props;
}

export default function FormSection({
  title = "Say something",
  inputPlaceholder = "Enter your text here...",
  buttonText = "Submit",
  content = { "Result will appear here." },
}: Props) {
  return (
    <section>
      <div class="container mx-auto py-12">
        <h2 class="text-3xl font-bold mb-4">{title}</h2>
        <form
          hx-post={useCustomComponent(import.meta.url, { title, inputPlaceholder, buttonText, content })}
          hx-target="closest section"
          hx-swap="innerHTML"
        >
          <input
            type="text"
            name="response"
            placeholder={inputPlaceholder}
            className="input input-bordered w-full mb-4"
          />
          <button type="submit" class="btn btn-primary">
            {buttonText}
          </button>
        </form>
        <div class="mt-12">{content}</div>
      </div>
    </section>
  );
}
