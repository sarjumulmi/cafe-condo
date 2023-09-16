CREATE TABLE IF NOT EXISTS public.invoice (
  charge_date timestamp with time zone NOT NULL,
  charge_title text NOT NULL,
  amount float NOT NULL,
  unit  varchar(100) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  PRIMARY KEY(charge_date, charge_title, unit)
);

