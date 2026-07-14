import { HookBox, SectionTag, SectionTitle } from "@/components/ui/SectionText";
import { Reveal } from "@/components/ui/Reveal";
import { PasBlock } from "./PasBlock";

export function PasSection() {
  return (
    <section className="px-[var(--edge-pad)] py-[var(--section-spacing-y)]">
      <div className="mx-auto max-w-(--prose-w)">
        <Reveal>
          <SectionTag>The reality diagnosis</SectionTag>
        </Reveal>
        <Reveal delay={1}>
          <SectionTitle className="max-w-full">
            The problem isn&apos;t just the month that closed in the red.
            <br />It&apos;s where that leads if nothing changes.
          </SectionTitle>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-14">
            <PasBlock variant="red" title="🔴 The scene you know by heart">
              <p>
                It&apos;s 11pm. The house is asleep. You spent the whole day swapping
                creatives, tweaking audiences, rewriting copy. Spent another R$500 on traffic.
                You open the dashboard, your heart races a little before the number loads, and
                there it is:{" "}
                <strong className="text-white">ROI 0.6. Again.</strong> You close the laptop
                with that knot in your stomach and the same nagging question. It&apos;s not{" "}
                <em>&quot;what do I do tomorrow?&quot;</em>. It&apos;s the worst one of all:{" "}
                <strong className="text-white">
                  &quot;why doesn&apos;t anything I do work?&quot;
                </strong>
              </p>
            </PasBlock>

            <PasBlock variant="orange" title="🟠 Money is just the visible part of the damage">
              <p>
                Add up what you&apos;ve already buried in traffic that never came back. Add up
                the courses you bought thinking <em>the next one</em> would be the missing
                piece. But the real damage doesn&apos;t show up on your statement:
              </p>
              <p>
                <strong className="hl">Financial:</strong> every day running blind is budget
                burned &quot;testing&quot; what a diagnosis would solve in minutes.{" "}
                <strong className="hl">Time:</strong> it&apos;s the hours, and the months, you&apos;ll
                never get back — trapped in a trial-and-error cycle that doesn&apos;t turn into
                learning, it turns into burnout.
              </p>
              <p>
                <strong className="hl">Emotional:</strong> the anxiety of opening the
                dashboard every morning, the guilt of not being present while your head is on
                the campaign, the silent shame of posting &quot;let&apos;s go&quot; while
                inside you don&apos;t know if the month will close.{" "}
                <strong className="hl">Opportunity:</strong> while you spin your wheels, the
                competitor who found the method is scaling — and <em>your</em> ad spend keeps
                getting more expensive. The market doesn&apos;t wait for you.
              </p>
            </PasBlock>

            <PasBlock variant="yellow" title="🟡 The compound cost of staying &quot;almost there&quot;">
              <p>
                Here&apos;s the part almost nobody stops to calculate: this doesn&apos;t stay
                still.{" "}
                <strong className="text-white">It gets worse on its own.</strong> Every week
                without structure is one more spike of hope followed by one more frustration,
                and with each cycle, a piece of your belief that <em>things can turn around</em>{" "}
                slips away. The real risk isn&apos;t closing one more bad month. It&apos;s you,
                six months from now, looking back and realizing you worked twice as hard, spent
                more, and are in <em>exactly</em> the same place — just more tired and more
                disillusioned.{" "}
                <strong className="text-white">
                  That&apos;s how good people give up: not all at once, but one frustrating
                  month at a time.
                </strong>
              </p>
            </PasBlock>

            <PasBlock variant="green" title="🟢 And the most unfair part of all">
              <p>
                It&apos;s not a lack of effort — you have plenty of that.{" "}
                <strong className="text-white">It&apos;s a lack of method.</strong> And
                method doesn&apos;t get fixed by working more hours, buying another course, or
                swapping the creative for the 40th time. It gets fixed by seeing what&apos;s{" "}
                <strong className="text-white">invisible to you right now</strong>, because
                it&apos;s inside your own operation, in the blind spot only an outside eye can
                point to.
              </p>
            </PasBlock>

            <PasBlock variant="blue" title="🔵 The way out exists, and it has a name">
              <p>
                There&apos;s a pattern in digital businesses that scale consistently, and it
                has nothing to do with a &quot;lucky winning product.&quot; It&apos;s
                structure. That&apos;s exactly the blind spot the diagnostic call was built to
                shine a light on: in 45 minutes, with your operation open on screen.
              </p>
            </PasBlock>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <HookBox>
            <p>
              Before you blame yourself again:{" "}
              <strong>
                the real reason your ROI has been stuck at the same number for months almost
                never has to do with bad creative or the wrong audience
              </strong>
              : most people pull exactly the lever that doesn&apos;t move anything, which is
              why they push harder and stay stuck.
            </p>
          </HookBox>
        </Reveal>
      </div>
    </section>
  );
}
