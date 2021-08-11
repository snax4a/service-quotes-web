import React from "react";
import useQueryData from "../../shared-hooks/useQueryData";
import { Quote, Role } from "../../types";
import { useRouter } from "next/router";
import { CenterLoader } from "../../ui/CenterLoader";
import { TitleText } from "../../ui/TitleText";
import { QuoteCard } from "../../ui/QuoteCard";

interface UnpaidQuotesListProps {
  role: Role;
}

export const UnpaidQuotesList: React.FC<UnpaidQuotesListProps> = ({ role }) => {
  const { push } = useRouter();
  const { data, isLoading } = useQueryData("quotes/unpaid");

  if (isLoading) return <CenterLoader />;
  if (!data) return null;

  return (
    <>
      <TitleText size="md" className="mt-7.5 mb-4.5">
        Unpaid quotes
      </TitleText>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-2xl">
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
