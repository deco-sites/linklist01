import { useComponent } from "./Component.tsx";
import type { AppContext } from "../apps/site.ts";

interface Props {
  /**
   * @format color-input
   */
  backgroundColor?: string;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const newColor = form.get("color") as string;
  return { ...props, backgroundColor: newColor };
}

export function loader(props: Props) {
  return props;
}

export default function ColorCard({
  backgroundColor = "#ffffff",
}: Props) {
  return (
    <section>
      <div class="container text-center py-6 relative">
        <div
          class="bg-white shadow-md rounded-lg p-6"
          style={{ backgroundColor }}
        >
          <h2 class="text-2xl font-bold mb-4">Color Card</h2>
          <form
            hx-post={useComponent(import.meta.url, { backgroundColor })}
            hx-target="closest section"
            hx-swap="outerHTML"
            class="flex justify-center gap-2"
          >
            <input
              type="color"
              name="color"
              value={backgroundColor}
              class="input input-bordered"
            />
            <button type="submit" class="btn btn-primary">
              <span class="inline [.htmx-request_&]:hidden">Apply</span>
              <span class="hidden [.htmx-request_&]:inline loading loading-spinner" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}