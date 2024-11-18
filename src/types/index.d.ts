interface JanusMessage {
  plugindata?: {
    data?: VideoRoomData;
  };
  jsep?: {
    e2ee?: boolean;
  };
  transaction?: string;
  _janode?: JanodeEvent;
}

interface VideoRoomData {
  videoroom: string;
  id?: number;
  description?: string;
  private_id?: string;
  publishers?: Array<{
    id: number;
    display: string;
    talking?: boolean;
    audio_codec?: string;
    video_codec?: string;
    simulcast?: unknown;
    streams?: unknown;
  }>;
  room?: number;
  exists?: boolean;
  list?: unknown[];
  allowed?: unknown[];
  record?: boolean;
  error?: string;
  error_code?: number;
  participants?: Array<{
    id: number;
    display: string;
    publisher: boolean;
    talking?: boolean;
  }>;
  permanent?: boolean;
  publisher_id?: number;
  rtp_stream?: unknown;
  forwarders?: unknown[];
  [key: string]: unknown;
}

interface JanodeEvent {
  event: string | null;
  data: {
    jsep?: {
      e2ee?: boolean;
    };
    room?: number;
    feed?: number;
    description?: string;
    private_id?: string;
    publishers?: Array<unknown>;
    participants?: Array<unknown>;
    [key: string]: unknown;
  };
}

type HandleMessageFunction = (
  janus_message: JanusMessage,
) => JanodeEvent | null;

interface JoinPublisher {
  room: number | string;
  feed?: number | string;
  audio?: boolean;
  video?: boolean;
  data?: boolean;
  display?: string;
  bitrate?: number;
  token?: string;
  pin?: string;
  record?: boolean;
  filename?: string;
  descriptions?: { [key: string]: unknown }[];
}

interface VideoRoomPublisherJoinedEvent {
  room: number | string;
  feed: number | string;
  display?: string;
  description: string;
  private_id: number;
  publishers: {
    feed: number | string;
    display?: string;
    talking?: boolean;
    audiocodec?: string;
    videocodec?: string;
    simulcast?: boolean;
    streams?: { [key: string]: unknown }[];
  }[];
  e2ee?: boolean;
  jsep?: RTCSessionDescriptionInit;
}

interface JoinSubscriber {
  room: number | string;
  feed?: number | string;
  audio?: boolean;
  video?: boolean;
  data?: boolean;
  private_id?: number;
  sc_substream_layer?: number;
  sc_substream_fallback_ms?: number;
  sc_temporal_layers?: number;
  streams?: { [key: string]: unknown }[];
  autoupdate?: boolean;
  use_msid?: boolean;
  token?: string;
  pin?: string;
}

interface VideoRoomSubscriberJoinedEvent {
  room: number | string;
  feed?: number | string;
  display?: string;
  streams?: { [key: string]: unknown }[]; // Replace with specific type if known
}

interface CreateRoom {
  room?: number | string;
  description?: string;
  max_publishers?: number;
  permanent?: boolean;
  is_private?: boolean;
  secret?: string;
  pin?: string;
  admin_key?: string;
  bitrate?: number;
  bitrate_cap?: boolean;
  fir_freq?: number;
  audiocodec?: string;
  videocodec?: string;
  talking_events?: boolean;
  talking_level_threshold?: number;
  talking_packets_threshold?: number;
  require_pvtid?: boolean;
  require_e2ee?: boolean;
  record?: boolean;
  rec_dir?: string;
  videoorient?: boolean;
  h264_profile?: string;
  vp9_profile?: string;
}

interface VideoRoomCreatedEvent {
  room: number | string;
  permanent: boolean;
}

interface DestroyRoom {
  room: number | string;
  permanent?: boolean;
  secret?: string;
}

interface VideoRoomDestroyedEvent {
  room: number | string;
  permanent: boolean;
}
