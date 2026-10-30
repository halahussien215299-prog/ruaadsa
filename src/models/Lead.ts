import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  reference: string;
  name: string;
  phone: string;
  business?: string;
  packageId: string;
  packageName: string;
  timeline: string;
  contactMethod: string;
  status: "new" | "contacted" | "interested" | "not_interested" | "won" | "closed";
  priority: "high" | "medium" | "low";
  notes?: string;
  saleAmount?: number;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    business: {
      type: String,
      trim: true,
      default: "",
    },
    packageId: {
      type: String,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    timeline: {
      type: String,
      default: "فوراً",
    },
    contactMethod: {
      type: String,
      default: "واتساب",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "interested", "not_interested", "won", "closed"],
      default: "new",
      index: true,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "high",
    },
    notes: {
      type: String,
      default: "",
    },
    saleAmount: {
      type: Number,
      default: 0,
    },
    source: {
      type: String,
      default: "Direct",
    },
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development HMR
export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
