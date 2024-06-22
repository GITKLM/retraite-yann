import BackgroundMusic from "@/components/BackgroundMusic";


export default function Header() {
  return (
<>
<div className="flex items-center justify-end gap-2 px-10">
<p>The Final Countdown</p>
<BackgroundMusic bgmsrc="/finalcountdown.mp3" />
</div>
</>
  );
}


