import { useComponent } from "./Component.tsx";
import type { AppContext } from "../apps/site.ts";

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format text-area
   */
  inputPlaceholder?: string;
  /**
   * @format text-area
   */
  buttonText?: string;
  /**
   * @format text-area
   */
  content?: string;
}

export async function action(
  props: Props,
  req: Request,
  ctx: AppContext
): Promise<Props> {
  const form = await req.formData();
  const response = `${form.get("response") ?? ""}`;
  if (!response) {
    return { ...props, content: "You didn't answer." };
  }
  return { ...props, content: `You answered: ${response}` };
}

 export function loader(props: Props) {
   return props;
 }

 export default function FormSection({
   title = "Say something",
   inputPlaceholder = "Enter your text here...",
   buttonText = "Submit",
   content = "Result will appear here.",
 }: Props) {
   return (
     <section>
       <div class="container mx-auto py-12 relative">
         <h2 class="text-3xl text-center font-bold mb-4">{title}</h2>
         <form
           hx-post={useComponent(import.meta.url, { title, inputPlaceholder, buttonText, content })}
           hx-target="closest section"
           hx-swap="outerHTML"
           class="flex justify-center gap-2"
         >
           <input
             type="text"
             name="response"
             placeholder={inputPlaceholder}
             class="input input-bordered mb-4"
           />
           <button type="submit" class="btn btn-primary">
             <span class="inline [.htmx-request_&]:hidden">{buttonText}</span> 
             <span class="hidden [.htmx-request_&]:inline loading loading-spinner"/>
           </button>
         </form>
         <div class="mt-5 text-center ">{content}</div>
       </div>
     </section>
   );
 }     