// Three blurred color fields behind the glass. They are deliberately static: anything
// moving back here forces every glass surface on screen to re-blur on every frame,
// which is what makes scrolling stutter. Painted once, composited as a single layer.
export function LiquidBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-30 blur-3xl dark:from-blue-600 dark:to-cyan-600 dark:opacity-20" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-25 blur-3xl dark:from-purple-600 dark:to-pink-600 dark:opacity-15" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 opacity-20 blur-3xl dark:from-orange-600 dark:to-yellow-600 dark:opacity-10" />

      {/* Grain, normal blending (a full-screen blend mode is costly on every frame) */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
