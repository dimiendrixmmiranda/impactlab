"use client";

interface DialogConfirmacaoProps {
    aberto: boolean;
    titulo: string;
    mensagem: string;
    textoConfirmar?: string;
    textoCancelar?: string;
    carregando?: boolean;
    onConfirmar: () => void;
    onCancelar: () => void;
}

export default function DialogPersonalizado({
    aberto,
    titulo,
    mensagem,
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",
    carregando = false,
    onConfirmar,
    onCancelar,
}: DialogConfirmacaoProps) {
    if (!aberto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                <h2 className="text-xl font-semibold text-white">
                    {titulo}
                </h2>

                <p className="mt-3 text-zinc-400">
                    {mensagem}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancelar}
                        className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
                    >
                        {textoCancelar}
                    </button>

                    <button
                        onClick={onConfirmar}
                        disabled={carregando}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                        {carregando ? "Aguarde..." : textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
}