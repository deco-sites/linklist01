import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Picture {
  mobile?: ImageWidget;
  desktop?: ImageWidget;
  alt?: string;
}

export default function Image({
  mobile =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/2bb6e3b9-90e8-49b0-86ce-465d6856343e",
  desktop =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4959/89934286-9a29-4ebc-bc90-39117d2e7edb",
  alt = "Image",
}: Picture) {
  return (
    <div class="max-w-[688px] mx-auto py-2 w-full lg:px-0 px-6">
      <figure class="relative">
        <Picture>
          <Source
            media="(max-width: 327px)"
            src={mobile || ""}
            width={327}
            height={344}
          />
          <Source
            media="(min-width: 688px)"
            src={desktop ? desktop : mobile || ""}
            width={688}
            height={344}
          />
          <img
            class="w-full object-cover"
            sizes="(max-width: 640px) 100vw, 30vw"
            src={mobile}
            alt={alt}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </figure>
    </div>
  );
}
