import Head from "next/head";
import { useRouter } from "next/router";

import QuesddoHead from "@/components/atoms/quesddo-head/QuesddoHead";
import { useInfiniteNotes } from "@/hooks/note/useInfiniteNotes";
import EmptyNotes from "@/views/notes/empty-notes/EmptyNotes";
import Goal from "@/views/notes/goal/Goal";
import NoteList from "@/views/notes/note-list/NoteList";

export default function NotesPage() {
  const {
    query: { goalId },
  } = useRouter();

  const { data: notes, inViewRef } = useInfiniteNotes(Number(goalId));

  const hasNotes = notes && notes.length > 0;

  return (
    <>
      <QuesddoHead title="노트 모아보기" />

      <div className="min-h-screen bg-slate-100">
        <div className="smd:pl-[360px] flex max-w-[792px] flex-col gap-4 p-4 sm:pl-[84px]">
          <h1 className="text-lg font-semibold text-slate-900">
            노트 모아보기
          </h1>

          {hasNotes ? (
            <>
              <Goal goal={notes[0]?.goal?.title} />
              <NoteList notes={notes} inViewRef={inViewRef} />
            </>
          ) : (
            <EmptyNotes />
          )}
        </div>
      </div>
    </>
  );
}
