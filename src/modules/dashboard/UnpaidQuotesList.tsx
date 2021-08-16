import React from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Quote, Role } from "../../types";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { TitleText } from "../../ui/TitleText";
import { QuoteCard } from "../../ui/QuoteCard";
import { InfoText } from "../../ui/InfoText";

interface UnpaidQuotesListProps {
  role: Role;
}

export const UnpaidQuotesList: React.FC<UnpaidQuotesListProps> = ({ role }) => {
  const { push } = useRouter();
  const { data, isLoading } = useQueryData("quotes/unpaid");

  if (isLoading) return <CenterLoader />;

  return (
    <>
      <TitleText size="md" className="mt-7.5 mb-4.5">
        Unpaid quotes
      </TitleText>
      {data?.length === 0 && <InfoText>There are no unpaid quotes.</InfoText>}
      <div className="grid grid-cols-1 gap-4 max-w-2xl md:grid-cols-3 md:gap-5">
        {data?.map((quote: Quote) => (
          <QuoteCard
            key={quote.id}
            type={role}
            quote={quote}
            onClick={() => {
              push(`/quotes/[id]`, `/quotes/${quote.id}`);
            }}
          />
        ))}
      </div>
    </>
  );
};
