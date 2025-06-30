type TitleProps = { 
  title: string
  subTitle: string
}

export const Title = (props: TitleProps) => {
  return (
    <div>
      <div>
        <h1 className="font-[600] text-[24px] text-[#09090B]">{props.title}</h1>
        <p className="font-[400] text-[16px] text-[#71717A]">
          {props.subTitle}
        </p>
      </div>
    </div>
  );
};
