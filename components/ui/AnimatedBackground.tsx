import { BlobField } from "./BlobField";
import { ConstellationField } from "./ConstellationField";
import { NoiseOverlay } from "./NoiseOverlay";

/**
 * Camada de fundo fixa atrás de todo o conteúdo (z-index negativo,
 * pointer-events: none — nunca sobrepõe nem bloqueia cliques).
 * Composição de 3 sub-camadas, da mais funda pra mais rasa:
 * blobs/anéis com parallax -> partículas em canvas -> grain.
 */
export function AnimatedBackground() {
  return (
    <>
      <BlobField />
      <ConstellationField />
      <NoiseOverlay />
    </>
  );
}
