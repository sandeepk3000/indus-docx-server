import { imagekit } from "../../config/imageKit";
import { mux } from "../../config/mux";
class MediaService {
  generateUploadAuth() {
    const { token, expire, signature } =
      imagekit.helper.getAuthenticationParameters();

    return {
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    };
  }
  async createVideoUploadUrl(passThrough:string) {
    try {
      const upload = await mux.video.uploads.create({
        cors_origin: process.env.FRONTEND_URL!,
        new_asset_settings: {
          playback_policies: ["public"],
          video_quality: "basic",
          passthrough:passThrough
        },
      });
      return upload;
    } catch (error) {
      console.error("Failed to create Mux video upload URL:", error);
      throw error;
    }
  }
}

export const mediaService = new MediaService();

