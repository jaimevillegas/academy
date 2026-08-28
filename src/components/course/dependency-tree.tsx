import Link from "next/link";
import { Download } from "lucide-react";
import { resourceGroup, type Course, type Resource } from "@/lib/types";

interface TreeItem {
  label: string;
  meta: string;
  color: string;
  href?: string;
}

interface TreeGroup {
  title: string;
  items: TreeItem[];
}

export function DependencyTree({
  course,
  resources,
  prerequisite,
  next,
}: {
  course: Course;
  resources: Resource[];
  prerequisite?: Course;
  next?: Course;
}) {
  const groups: TreeGroup[] = [];

  if (prerequisite) {
    groups.push({
      title: "REQUISITO PREVIO",
      items: [
        {
          label: prerequisite.courseCode + " · " + prerequisite.title,
          meta: "CURSO",
          color: "var(--phosphor)",
          href: "/catalogo/" + prerequisite.slug,
        },
      ],
    });
  }

  const cadFiles = resources.filter(
    (resource) => resourceGroup[resource.resourceType] === "ARCHIVOS CAD",
  );
  if (cadFiles.length > 0) {
    groups.push({
      title: "ARCHIVOS CAD",
      items: cadFiles.map((resource) => ({
        label: resource.title,
        meta: resource.size,
        color: "var(--text)",
      })),
    });
  }

  const docs = resources.filter(
    (resource) => resourceGroup[resource.resourceType] === "DOCUMENTACIÓN",
  );
  if (docs.length > 0) {
    groups.push({
      title: "DOCUMENTACIÓN",
      items: docs.map((resource) => ({
        label: resource.title,
        meta: resource.resourceType + " · " + resource.size,
        color: "var(--amber)",
      })),
    });
  }

  if (next) {
    groups.push({
      title: "SIGUIENTE EN RUTA",
      items: [
        {
          label: next.courseCode + " · " + next.title,
          meta: "CURSO",
          color: "var(--phosphor)",
          href: "/catalogo/" + next.slug,
        },
      ],
    });
  }

  return (
    <aside className="flex w-full flex-col gap-[24px] bg-[var(--panel)] px-page py-[32px] lg:w-[380px] lg:px-[24px] xl:w-[440px] xl:px-[32px] xl:py-[40px]">
      <header className="flex flex-col gap-[8px]">
        <span className="font-mono-plex text-[11px] tracking-[1.4px] text-[var(--cyan)]">
          ÁRBOL DE DEPENDENCIAS
        </span>
        <p className="text-[14px] text-[var(--text-dim)]">
          Recursos vinculados a {course.courseCode}
        </p>
      </header>

      {groups.length === 0 && (
        <p className="border border-[var(--grid)] px-[16px] py-[20px] font-mono-plex text-[11px] text-[var(--text-faint)]">
          SIN DEPENDENCIAS REGISTRADAS
        </p>
      )}

      {groups.map((group) => (
        <div key={group.title} className="flex flex-col">
          <div className="flex h-[28px] items-center gap-[8px] border-b border-[var(--grid)]">
            <span className="font-mono-plex text-[10px] tracking-[1px] text-[var(--text-faint)]">
              {group.title}
            </span>
            <span className="flex-1" />
            <span className="font-mono-plex text-[10px] text-[var(--text-faint)]">
              {String(group.items.length).padStart(2, "0")}
            </span>
          </div>

          {group.items.map((item, index) => {
            const branch = index === group.items.length - 1 ? "└─" : "├─";
            const content = (
              <>
                <span className="font-mono-plex text-[11px] text-[var(--text-faint)]">
                  {branch}
                </span>
                <span
                  className="flex-1 font-mono-plex text-[11.5px] leading-[1.3]"
                  style={{ color: item.color }}
                >
                  {item.label}
                </span>
                <span className="font-mono-plex text-[9.5px] tracking-[0.6px] text-[var(--text-faint)]">
                  {item.meta}
                </span>
              </>
            );

            const className =
              "flex min-h-[38px] items-center gap-[10px] border-b border-[var(--grid-soft)] py-[6px] transition-instrument";

            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={className + " hover:bg-[var(--panel-raised)]"}
              >
                {content}
              </Link>
            ) : (
              <div key={item.label} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      ))}

      <button
        type="button"
        className="flex h-[42px] items-center justify-center gap-[8px] border border-[var(--cyan)] font-mono-plex text-[11px] tracking-[0.8px] text-[var(--cyan)] transition-instrument hover:bg-[var(--cyan)] hover:text-[var(--chassis)]"
      >
        <Download size={13} strokeWidth={1.5} />[ DESCARGAR_PAQUETE_COMPLETO ]
      </button>
    </aside>
  );
}
