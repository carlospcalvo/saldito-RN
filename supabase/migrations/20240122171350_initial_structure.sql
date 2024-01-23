
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "supabase_migrations";

ALTER SCHEMA "supabase_migrations" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."expense_participant_type" AS ENUM (
    'creditor',
    'debtor'
);

ALTER TYPE "public"."expense_participant_type" OWNER TO "postgres";

CREATE TYPE "public"."group_type_enum" AS ENUM (
    'friends',
    'family',
    'travel',
    'work'
);

ALTER TYPE "public"."group_type_enum" OWNER TO "postgres";

CREATE TYPE "public"."transaction_type_enum" AS ENUM (
    'payment',
    'expense'
);

ALTER TYPE "public"."transaction_type_enum" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."add_group_admin_as_member"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
 -- Insert a new member for the group creator
  INSERT INTO members (user_id, group_id, is_admin, balance)
  VALUES (NEW.admin, NEW.id, true, 0);

  RETURN NEW;
END$$;

ALTER FUNCTION "public"."add_group_admin_as_member"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."create_profile_for_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;$$;

ALTER FUNCTION "public"."create_profile_for_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."deduct_balance_on_expense"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    -- Update the balance of the payer (adding the amount)
    UPDATE members
    SET balance = balance - NEW.amount
    WHERE user_id = NEW.user_id  
        AND NEW.participated_as = 'debtor'; 

    RETURN NEW;
END;$$;

ALTER FUNCTION "public"."deduct_balance_on_expense"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."increase_balance_on_expense"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    -- Update the balance of the payer (adding the amount)
    UPDATE members
    SET balance = balance + NEW.amount
    WHERE user_id = NEW.user_id 
        AND NEW.participated_as = 'creditor'; 

    RETURN NEW;
END;$$;

ALTER FUNCTION "public"."increase_balance_on_expense"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."payment_update_balances"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    -- Update creditor
    UPDATE members
    SET balance = balance - NEW.amount
    WHERE user_id = NEW.to_user AND group_id = NEW.group_id; 
    
    -- Update debtor
    UPDATE members
    SET balance = balance + NEW.amount
    WHERE user_id = NEW.from_user AND group_id = NEW.group_id; 
    
    RETURN NEW;
END;$$;

ALTER FUNCTION "public"."payment_update_balances"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."payment_update_balances_on_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    -- Update creditor
    UPDATE members
    SET balance = balance + OLD.amount
    WHERE user_id = OLD.to_user AND group_id = OLD.group_id; 
    
    -- Update debtor
    UPDATE members
    SET balance = balance - OLD.amount
    WHERE user_id = OLD.from_user AND group_id = OLD.group_id; 
    
    RETURN OLD;
END;$$;

ALTER FUNCTION "public"."payment_update_balances_on_delete"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."restore_creditor_balance_on_expense_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    -- Update the balance of the payer (adding the amount)
    UPDATE members
    SET balance = balance - OLD.amount
    WHERE user_id = OLD.user_id 
        AND OLD.participated_as = 'creditor'; 

    RETURN OLD;
END;$$;

ALTER FUNCTION "public"."restore_creditor_balance_on_expense_delete"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."restore_creditor_balance_on_payment_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    UPDATE members
    SET balance = balance + OLD.amount
    WHERE user_id = OLD.to_user AND group_id = OLD.group_id; 
    RETURN OLD;
END;$$;

ALTER FUNCTION "public"."restore_creditor_balance_on_payment_delete"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."restore_debtor_balance_on_expense_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    -- Update the balance of the payer (adding the amount)
    UPDATE members
    SET balance = balance + OLD.amount
    WHERE user_id = OLD.user_id 
        AND OLD.participated_as = 'debtor'; 

    RETURN OLD;
END;$$;

ALTER FUNCTION "public"."restore_debtor_balance_on_expense_delete"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."restore_debtor_balance_on_payment_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    UPDATE members
    SET balance = balance - OLD.amount
    WHERE user_id = OLD.to_user AND group_id = OLD.group_id; 
    RETURN OLD;
END;$$;

ALTER FUNCTION "public"."restore_debtor_balance_on_payment_delete"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."expense_participants" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "expense_id" "uuid" NOT NULL,
    "participated_as" "public"."expense_participant_type" NOT NULL,
    "amount" numeric NOT NULL
);

ALTER TABLE "public"."expense_participants" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."expenses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "public"."transaction_type_enum" NOT NULL,
    "date" "date" DEFAULT CURRENT_DATE NOT NULL,
    "amount" numeric NOT NULL,
    "description" character varying,
    "group_id" "uuid" NOT NULL
);

ALTER TABLE "public"."expenses" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."groups" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "category" "public"."group_type_enum" NOT NULL,
    "currency" "text" DEFAULT 'ARS'::"text" NOT NULL,
    "admin" "uuid" NOT NULL,
    "image" "text",
    "simplify_debts" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."groups" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."members" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "group_id" "uuid" NOT NULL,
    "is_admin" boolean DEFAULT false NOT NULL,
    "balance" numeric DEFAULT '0'::numeric NOT NULL
);

ALTER TABLE "public"."members" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "from_user" "uuid" NOT NULL,
    "to_user" "uuid" NOT NULL,
    "group_id" "uuid" NOT NULL,
    "amount" numeric NOT NULL,
    "currency" "text" DEFAULT 'ARS'::"text" NOT NULL,
    "date" "date" DEFAULT CURRENT_DATE NOT NULL
);

ALTER TABLE "public"."payments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "avatar" character varying
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "supabase_migrations"."schema_migrations" (
    "version" "text" NOT NULL,
    "statements" "text"[],
    "name" "text"
);

ALTER TABLE "supabase_migrations"."schema_migrations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."groups"
    ADD CONSTRAINT "dummy_groups_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."expense_participants"
    ADD CONSTRAINT "expense_participants_pkey" PRIMARY KEY ("user_id", "expense_id", "participated_as");

ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_pkey" PRIMARY KEY ("user_id", "group_id");

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "supabase_migrations"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");

CREATE OR REPLACE TRIGGER "add_group_admin_as_member" AFTER INSERT ON "public"."groups" FOR EACH ROW EXECUTE FUNCTION "public"."add_group_admin_as_member"();

CREATE OR REPLACE TRIGGER "expense_debtor_balance_deduction" AFTER INSERT OR UPDATE ON "public"."expense_participants" FOR EACH ROW EXECUTE FUNCTION "public"."deduct_balance_on_expense"();

CREATE OR REPLACE TRIGGER "expense_debtor_balance_restore" AFTER DELETE ON "public"."expense_participants" FOR EACH ROW EXECUTE FUNCTION "public"."restore_debtor_balance_on_expense_delete"();

CREATE OR REPLACE TRIGGER "expense_payer_balance_increase" AFTER INSERT OR UPDATE ON "public"."expense_participants" FOR EACH ROW EXECUTE FUNCTION "public"."increase_balance_on_expense"();

CREATE OR REPLACE TRIGGER "expense_payer_balance_restore" AFTER DELETE ON "public"."expense_participants" FOR EACH ROW EXECUTE FUNCTION "public"."restore_creditor_balance_on_expense_delete"();

CREATE OR REPLACE TRIGGER "payment_update_balances" AFTER INSERT OR UPDATE ON "public"."payments" FOR EACH ROW EXECUTE FUNCTION "public"."payment_update_balances"();

CREATE OR REPLACE TRIGGER "payment_update_balances_on_delete" AFTER DELETE ON "public"."payments" FOR EACH ROW EXECUTE FUNCTION "public"."payment_update_balances_on_delete"();

ALTER TABLE ONLY "public"."expense_participants"
    ADD CONSTRAINT "expense_participants_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "public"."expenses"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."expense_participants"
    ADD CONSTRAINT "expense_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."expenses"
    ADD CONSTRAINT "expenses_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id");

ALTER TABLE ONLY "public"."groups"
    ADD CONSTRAINT "groups_admin_fkey" FOREIGN KEY ("admin") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."members"
    ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_from_user_fkey" FOREIGN KEY ("from_user") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id");

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_to_user_fkey" FOREIGN KEY ("to_user") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable insert for authenticated users only" ON "public"."expenses" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."groups" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."payments" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."expense_participants" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."expenses" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."groups" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."members" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."payments" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."profiles" FOR SELECT TO "authenticated" USING (true);

ALTER TABLE "public"."expense_participants" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."expenses" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."groups" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."members" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."add_group_admin_as_member"() TO "anon";
GRANT ALL ON FUNCTION "public"."add_group_admin_as_member"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_group_admin_as_member"() TO "service_role";

GRANT ALL ON FUNCTION "public"."create_profile_for_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."create_profile_for_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_profile_for_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."deduct_balance_on_expense"() TO "anon";
GRANT ALL ON FUNCTION "public"."deduct_balance_on_expense"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."deduct_balance_on_expense"() TO "service_role";

GRANT ALL ON FUNCTION "public"."increase_balance_on_expense"() TO "anon";
GRANT ALL ON FUNCTION "public"."increase_balance_on_expense"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."increase_balance_on_expense"() TO "service_role";

GRANT ALL ON FUNCTION "public"."payment_update_balances"() TO "anon";
GRANT ALL ON FUNCTION "public"."payment_update_balances"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."payment_update_balances"() TO "service_role";

GRANT ALL ON FUNCTION "public"."payment_update_balances_on_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."payment_update_balances_on_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."payment_update_balances_on_delete"() TO "service_role";

GRANT ALL ON FUNCTION "public"."restore_creditor_balance_on_expense_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."restore_creditor_balance_on_expense_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."restore_creditor_balance_on_expense_delete"() TO "service_role";

GRANT ALL ON FUNCTION "public"."restore_creditor_balance_on_payment_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."restore_creditor_balance_on_payment_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."restore_creditor_balance_on_payment_delete"() TO "service_role";

GRANT ALL ON FUNCTION "public"."restore_debtor_balance_on_expense_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."restore_debtor_balance_on_expense_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."restore_debtor_balance_on_expense_delete"() TO "service_role";

GRANT ALL ON FUNCTION "public"."restore_debtor_balance_on_payment_delete"() TO "anon";
GRANT ALL ON FUNCTION "public"."restore_debtor_balance_on_payment_delete"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."restore_debtor_balance_on_payment_delete"() TO "service_role";

GRANT ALL ON TABLE "public"."expense_participants" TO "anon";
GRANT ALL ON TABLE "public"."expense_participants" TO "authenticated";
GRANT ALL ON TABLE "public"."expense_participants" TO "service_role";

GRANT ALL ON TABLE "public"."expenses" TO "anon";
GRANT ALL ON TABLE "public"."expenses" TO "authenticated";
GRANT ALL ON TABLE "public"."expenses" TO "service_role";

GRANT ALL ON TABLE "public"."groups" TO "anon";
GRANT ALL ON TABLE "public"."groups" TO "authenticated";
GRANT ALL ON TABLE "public"."groups" TO "service_role";

GRANT ALL ON TABLE "public"."members" TO "anon";
GRANT ALL ON TABLE "public"."members" TO "authenticated";
GRANT ALL ON TABLE "public"."members" TO "service_role";

GRANT ALL ON TABLE "public"."payments" TO "anon";
GRANT ALL ON TABLE "public"."payments" TO "authenticated";
GRANT ALL ON TABLE "public"."payments" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
