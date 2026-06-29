import "react";

// React 19.2's <ViewTransition> ships in the runtime (and in Next's bundled
// React) but isn't in @types/react yet. Augment the module so the import is
// typed. Trim/extend props as the API stabilizes.
declare module "react" {
  /** Maps a transition type to a view-transition class, or "none" to skip. */
  type ViewTransitionClass = string | Record<string, string>;

  interface ViewTransitionProps {
    children?: React.ReactNode;
    /** Shared identity across routes — animates between matching names. */
    name?: string;
    enter?: ViewTransitionClass;
    exit?: ViewTransitionClass;
    update?: ViewTransitionClass;
    share?: ViewTransitionClass;
    layout?: ViewTransitionClass;
    /** Class used for transitions not matched by the above (e.g. "none"). */
    default?: ViewTransitionClass;
  }

  export const ViewTransition: React.FC<ViewTransitionProps>;
}
