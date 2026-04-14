export function ThemeScript() {
  const code = `
(function(){
  try {
    if (localStorage.getItem('mc_theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;
  return (
    <script
      // Runs before first paint when placed early in <head> or <body>
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
