"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import NavData from "@/components/shadcn-space/blocks/topbar-04/data";
import { NavGroup } from "@/components/shadcn-space/blocks/topbar-04/types";

type IconProps = {
  size?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
};

type IconComponent = React.ComponentType<IconProps>;

function SidebarIcon({
  icon: Icon,
  size = 20,
  className,
}: {
  icon: IconComponent;
  size?: number;
  className?: string;
}) {
  return (
    <Icon
      size={size}
      width={size}
      height={size}
      className={className}
    />
  );
}

export default function Sidebar({
  onLinkClick,
}: {
  onLinkClick?: () => void;
}) {
  return (
    <nav className="space-y-1 px-4 ">
      <Accordion className="w-full  gap-2">
        {(NavData as NavGroup[]).map((group) => {
          const hasChildren =
            Array.isArray(group.items) && group.items.length > 0;

          const GroupIcon = group.icon as IconComponent;

          // Parent color
          const groupColor ="green";

          // ─────────────────────────────────────
          // SINGLE LINK
          // ─────────────────────────────────────

          if (!hasChildren && group.href) {
            return (
              <a
                key={group.label}
                href={group.href}
                onClick={onLinkClick}
                className="
                  flex items-center gap-2
                  rounded-md
                  px-2 py-2
                  text-sm font-normal
                  hover:bg-accent
                  hover:text-foreground
                  no-underline!
                "
              >
                {/* Icon */}
                <SidebarIcon
                  icon={GroupIcon}
                  size={20}
                  className={groupColor}
                />

                {/* Text */}
                <span className={groupColor}>
                  {group.label}
                </span>
              </a>
            );
          }

          // ─────────────────────────────────────
          // ACCORDION GROUP
          // ─────────────────────────────────────

          return (
            <AccordionItem
              key={group.label}
              value={group.label}
              className="border-none"
            >
              <AccordionTrigger
                id={`accordion-trigger-${group.label}`}
                className="
                  flex items-center gap-2
                  px-2 py-2
                  text-sm
                  hover:no-underline
                  cursor-pointer
                "
              >
                <div className="flex items-center gap-2">
                  {/* Parent Icon */}
                  <SidebarIcon
                    icon={GroupIcon}
                    size={20}
                    className={groupColor}
                  />

                  {/* Parent Text */}
                  <span
                    className={`tracking-normal! ${groupColor}`}
                  >
                    {group.label}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pl-4">
                <div className="space-y-1">
                  {group.items?.map((item) => {
                    const ItemIcon = item.icon as IconComponent;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={onLinkClick}
                        className="
                          flex items-center gap-2
                          rounded-md
                          px-2 py-1.5
                          text-sm
                          hover:bg-accent
                          hover:text-foreground
                          no-underline!
                        "
                      >
                        {/* Child Icon */}
                        <SidebarIcon
                          icon={ItemIcon}
                          size={18}
                          className={item.iconColor}
                        />

                        {/* Child Text */}
                        <span>
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
}