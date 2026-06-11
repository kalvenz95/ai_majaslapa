"use client";

/**
 * Maps the legacy emoji glyphs used across course/marketing blocks to clean
 * lucide-react line icons, so block tiles look intentionally designed instead
 * of like raw emoji. Data arrays keep their `emoji: "🎬"` values — only the
 * render swaps the glyph for the mapped icon. Unmapped emoji fall back to a
 * neutral icon so nothing ever breaks.
 */
import {
  Target, Bot, Smartphone, Mic, Clapperboard, MessageCircle, Globe, Calendar,
  Brain, BarChart3, TrendingUp, FileText, ClipboardList, Package, Scissors,
  Palette, Coins, Volume2, GraduationCap, Home, Stethoscope, UtensilsCrossed,
  Phone, Laptop, Paintbrush, PenLine, Pencil, Pizza, Car, Dumbbell, Scale,
  Building2, Mail, Wrench, Image as ImageIcon, Zap, Compass, Gem, Handshake,
  Users, Database, Flame, Lock, Unlock, BookOpen, Lightbulb, Clock, Download,
  Sparkles, Rocket, Search, Send, CheckCircle2, Megaphone, Layers, Bell,
  ShoppingBag, type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  "🎯": Target,
  "🤖": Bot,
  "📱": Smartphone,
  "🎙️": Mic, "🎙": Mic, "🔊": Volume2,
  "🎬": Clapperboard, "📹": Clapperboard,
  "💬": MessageCircle,
  "🌐": Globe,
  "📅": Calendar,
  "🧠": Brain,
  "📊": BarChart3, "📈": TrendingUp,
  "📄": FileText, "📝": PenLine, "✍️": PenLine, "✏️": Pencil,
  "📋": ClipboardList,
  "📦": Package,
  "✂️": Scissors, "💇": Scissors,
  "🎨": Palette, "🖌️": Paintbrush, "🖼️": ImageIcon,
  "💰": Coins, "💎": Gem,
  "🎓": GraduationCap, "📚": BookOpen,
  "🏠": Home, "🏗️": Building2, "🏥": Stethoscope, "🦷": Stethoscope,
  "🍽️": UtensilsCrossed, "🍕": Pizza,
  "📞": Phone, "✉️": Mail,
  "💻": Laptop,
  "🚗": Car, "🏋️": Dumbbell, "⚖️": Scale,
  "⚡": Zap, "⚡️": Zap, "🔥": Flame,
  "🧭": Compass, "🤝": Handshake, "👥": Users, "🗄️": Database,
  "🔒": Lock, "🔓": Unlock,
  "💡": Lightbulb, "🕐": Clock, "⏱": Clock, "⏱️": Clock,
  "⬇️": Download, "🔧": Wrench,
  "🚀": Rocket, "🔍": Search, "📣": Megaphone, "🔔": Bell,
  "🛍️": ShoppingBag, "✅": CheckCircle2, "✦": Sparkles, "🟦": Layers, "📤": Send,
};

type Props = {
  /** The original emoji glyph from the data arrays */
  emoji: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
};

/**
 * Renders the lucide icon mapped to an emoji. Unmapped glyphs (e.g. flags 🇱🇻)
 * fall back to the original emoji so meaning is never lost — only the curated
 * object/tool emoji turn into line icons.
 */
export function EmojiIcon({ emoji, size = 22, color = "currentColor", strokeWidth = 2, className }: Props) {
  const Icon = MAP[emoji?.trim?.() ?? emoji];
  if (!Icon) {
    return (
      <span className={className} style={{ fontSize: size, lineHeight: 1 }} aria-hidden>
        {emoji}
      </span>
    );
  }
  return <Icon size={size} color={color} strokeWidth={strokeWidth} className={className} aria-hidden />;
}

/** True when the emoji has a dedicated icon mapping (not the fallback). */
export function hasEmojiIcon(emoji: string): boolean {
  return Boolean(MAP[emoji?.trim?.() ?? emoji]);
}
