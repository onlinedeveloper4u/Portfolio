import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * DynamicMeta component fetches profile_image from site_settings
 * and dynamically updates the favicon and og:image meta tags.
 */
const DynamicMeta = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            const { data } = await supabase
                .from("site_settings")
                .select("value")
                .eq("key", "profile_image")
                .single();

            if (data?.value) {
                setProfileImage(data.value);
            }
        };

        fetchProfileImage();
    }, []);

    useEffect(() => {
        if (!profileImage) return;

        // Update favicon
        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (existingFavicon) {
            existingFavicon.setAttribute("href", profileImage);
        } else {
            const favicon = document.createElement("link");
            favicon.rel = "icon";
            favicon.type = "image/png";
            favicon.href = profileImage;
            document.head.appendChild(favicon);
        }

        // Update og:image
        const existingOgImage = document.querySelector('meta[property="og:image"]');
        if (existingOgImage) {
            existingOgImage.setAttribute("content", profileImage);
        } else {
            const ogImage = document.createElement("meta");
            ogImage.setAttribute("property", "og:image");
            ogImage.setAttribute("content", profileImage);
            document.head.appendChild(ogImage);
        }
    }, [profileImage]);

    // This component doesn't render anything visible
    return null;
};

export default DynamicMeta;
