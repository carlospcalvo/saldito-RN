SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '2cf02eab-1c62-4c0e-8798-2daf868ff5dd', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"carloscalvonazabal@gmail.com","user_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","user_phone":""}}', '2024-01-07 22:07:19.011015+00', ''),
	('00000000-0000-0000-0000-000000000000', '780a4170-789e-431a-afdd-866555ec425b', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-01-07 23:02:28.119531+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f9b1989-b3e4-4e9e-91a6-522293a0b44e', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-01-07 23:02:36.53054+00', ''),
	('00000000-0000-0000-0000-000000000000', '586bff4f-6856-4a57-8f78-6fafcd145c06', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-07 23:18:35.424982+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea318f6d-d1ec-41d0-bc23-bf73a6687bde', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-07 23:19:42.188457+00', ''),
	('00000000-0000-0000-0000-000000000000', '3e6f1187-d1ba-42fd-865c-83e167f20e36', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-07 23:28:11.173649+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f07e39d-3a49-463b-a40f-0113b13373d0', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-07 23:29:57.410487+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ebbcb804-e812-449a-8470-0ea25bacb624', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-07 23:31:35.476095+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4cdc48b-a267-4367-88d4-19a9562f0634', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-07 23:34:00.608726+00', ''),
	('00000000-0000-0000-0000-000000000000', '5584f7a8-3f79-4910-a8d9-14cb52a612a1', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-07 23:41:07.22708+00', ''),
	('00000000-0000-0000-0000-000000000000', '42b0b8d7-c66b-4154-bbe2-787dad9d57b6', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-08 02:15:26.287285+00', ''),
	('00000000-0000-0000-0000-000000000000', '0cd72ff3-ead3-42b6-ad5b-68869f8684a9', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test@test.com","user_id":"0e6a3adc-b3f9-432a-9a5a-1833618c52d1","user_phone":""}}', '2024-01-08 02:43:05.617519+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9e9f545-1188-4e4e-bc35-a050d1c37fc2', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test2@test.com","user_id":"e1228cee-0646-4ff4-a5b4-407cdaba2ddf","user_phone":""}}', '2024-01-08 02:43:55.816001+00', ''),
	('00000000-0000-0000-0000-000000000000', '18dd811b-60da-4477-891a-b684fd20b796', '{"action":"token_refreshed","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 03:15:27.377191+00', ''),
	('00000000-0000-0000-0000-000000000000', '8278530a-65f2-42cd-8e61-62efd2317fcd', '{"action":"token_revoked","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 03:15:27.377762+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2f131a0-08a2-4863-9c5e-221d9dfabebd', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-08 04:09:48.115528+00', ''),
	('00000000-0000-0000-0000-000000000000', '35fe34d5-d657-40fa-a953-1cb409633972', '{"action":"token_refreshed","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 13:13:51.699296+00', ''),
	('00000000-0000-0000-0000-000000000000', '752e89c0-22cd-4098-8edf-4f3d02d612f3', '{"action":"token_revoked","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 13:13:51.699928+00', ''),
	('00000000-0000-0000-0000-000000000000', '86f77e22-9a72-4ed0-a2e1-a0b854796675', '{"action":"token_refreshed","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 14:14:01.170096+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b74e4dc-5233-4e00-9d77-d59283a11487', '{"action":"token_revoked","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 14:14:01.170672+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a6a2b39-8c3a-4899-97fc-22d70d874026', '{"action":"user_confirmation_requested","actor_id":"c3c6480c-8c5b-4de2-9e8e-7951a540b71b","actor_username":"test3@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-01-08 14:34:25.341202+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c594f7dc-792f-41f4-baa7-f92fe656584c', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test3@test.com","user_id":"c3c6480c-8c5b-4de2-9e8e-7951a540b71b","user_phone":""}}', '2024-01-08 14:36:32.077849+00', ''),
	('00000000-0000-0000-0000-000000000000', '77ff84f7-e9a0-4831-a317-867b1d49f428', '{"action":"user_confirmation_requested","actor_id":"1ca3b15b-8536-484d-a657-eccbded1581b","actor_username":"test3@tes.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-01-08 14:45:31.332888+00', ''),
	('00000000-0000-0000-0000-000000000000', '16bcdcee-477c-4670-b7f4-22849148709b', '{"action":"user_confirmation_requested","actor_id":"9cda8f62-c696-4c77-8a4a-523496c91dc7","actor_username":"test1@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-01-08 15:04:42.269376+00', ''),
	('00000000-0000-0000-0000-000000000000', '446eeabe-3780-4217-bc52-bbc68ac4e7eb', '{"action":"user_confirmation_requested","actor_id":"9cda8f62-c696-4c77-8a4a-523496c91dc7","actor_username":"test1@test.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-01-08 15:05:50.08246+00', ''),
	('00000000-0000-0000-0000-000000000000', '210ffe58-458d-426a-8a1b-e606b595d980', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-08 15:17:51.762283+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6fdd043-f165-4222-8e84-6556b577d5a4', '{"action":"token_refreshed","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 18:45:29.154584+00', ''),
	('00000000-0000-0000-0000-000000000000', '574ad583-82ab-4a51-ba22-e63a68a71abc', '{"action":"token_revoked","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-08 18:45:29.156832+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bf44c13-df0f-4ab0-90cc-7a416b6d100e', '{"action":"token_refreshed","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-09 13:57:34.502534+00', ''),
	('00000000-0000-0000-0000-000000000000', '57eaa01c-0b12-4ea1-a1d2-039f29c61e7e', '{"action":"token_revoked","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-09 13:57:34.503221+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a36d2e6-f78e-4a31-aa9e-37e3deda2fb9', '{"action":"token_refreshed","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-09 19:05:24.325811+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dafbbb7-e33b-4f87-bade-6b3186af2fc8', '{"action":"token_revoked","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-01-09 19:05:24.326427+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e645ca27-c7b9-427e-a235-26147b526340', '{"action":"login","actor_id":"3161ff50-973a-4cf1-89f7-dfc705b83542","actor_name":"Carlos Calvo Nazábal","actor_username":"carloscalvonazabal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}', '2024-01-09 20:11:06.010424+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") VALUES
	('3b9933fd-ae25-4b4f-bbaf-42de04000485', '3161ff50-973a-4cf1-89f7-dfc705b83542', '96492471-c443-452b-bd5c-98d0edbe40f8', 's256', 'R12Q5pz-O0_vpOcqWzn2FuWUJaSNjKCsFBIoGxC3N4M', 'google', 'ya29.a0AfB_byD8_igHd_GRHpkXtbnJpKnHCH4nmdulhs5v4EGSRuK87h4ZVYRraVN5HS70h6ahgvtN3Q_hthv9TyRVeNpLDTijzw27Wz9Ae742RJ-xIdxv0lFZgP8HNAU44s6MV4m71FFxc_ucmJVwT6Ah-wz9pi9E3MXMnAaCgYKAVISARMSFQHGX2MiesOkn45y5ITnhe4uWLK11g0169', '', '2024-01-07 23:28:07.716089+00', '2024-01-07 23:28:11.174593+00', 'oauth'),
	('a365f190-b251-4a46-af38-bdd00bf68529', '3161ff50-973a-4cf1-89f7-dfc705b83542', 'dc7099b2-3570-4626-b228-eb7cbd4ac05d', 's256', '_Da8Z_ot6qQgsqTEvugTnZGQGMoDteE1WbkTtWht5o8', 'google', 'ya29.a0AfB_byAQFoU-eon87i5rldd2-49Dk1cqijJD9sZhIzRn0qLkqCa7f6mG0zzPL6G2iri3lwUtXKr4N7IZZ9h5qfHVEHsy95YK4wL_aDlaGXiN7dV_pNcRZ4sNjivskto5y0ei3fvwPX8uGTZnE22EGr5MJ-P0OB0aOwaCgYKAQoSARMSFQHGX2Mig7zSONy6LOaEMe4fqIebOw0169', '', '2024-01-07 23:29:53.288377+00', '2024-01-07 23:29:57.411031+00', 'oauth'),
	('d98499cd-2c03-435c-a134-d8067a93dbff', '3161ff50-973a-4cf1-89f7-dfc705b83542', 'a04af520-0ec6-4eb6-89d0-e3f578674c7c', 's256', 'y61Qgw9b7gp7a3BqnBY7JUOFVUAgmsYWyNWOAocAprw', 'google', 'ya29.a0AfB_byA_8OyspT7BAKvCrzueG5rFDOxx8yv1R6_jpIWOS5nVVT5jP0Zw786U_EE6f_imagqz5RikETvBMsOdsvzNOILs2Qh6tU--vGr0R3vURpGRTqp_ZZLm8hxiZFsb35X1x_hJ0LGY3K64N4j25zOH0DGpLR6bXAaCgYKASUSARMSFQHGX2Miz_BlgQTFigtwODkI25RQoQ0169', '', '2024-01-07 23:31:32.014026+00', '2024-01-07 23:31:35.476651+00', 'oauth'),
	('c8870030-a2c6-4298-8b28-dfbf2bdead26', '3161ff50-973a-4cf1-89f7-dfc705b83542', 'e6947b24-c362-45d1-9050-3e439f96a0dc', 's256', '4H_k9_gXvUpU_3Hb64gdXs4EEGPMRREP2_GIIuiWkiw', 'google', 'ya29.a0AfB_byD6JYxj9xSIEwk-H3gKK2_S9PYOPe7nOGETdMPvaFulLp-hf3H6yk9IkT54h049-8WFjyKNd_0Nh4co8PkuuBXv9mQQdvt5bo_OacDM9tj-po46tdJCqIwJPjL2pkCDlVOZSt0m4YwpgYoWJgN6D1LmfObc9QaCgYKAQgSARMSFQHGX2MiQIhQsUHw9oWIeyLvVx5SVQ0169', '', '2024-01-07 23:33:56.825351+00', '2024-01-07 23:34:00.609385+00', 'oauth'),
	('8899cb7d-7914-4db0-87e1-15f38f20fa9b', '3161ff50-973a-4cf1-89f7-dfc705b83542', '0c01e0a4-23bb-4f72-aa04-1d9f2a46ad77', 's256', '3Yhm473dc-l5K2xUSx-aiDjtVdf5a-q8F-iEXHGxzlU', 'google', 'ya29.a0AfB_byAWg3Q260GTwEgDYUli5XBpoThjttnfqRE6kJAZ-ajtDGQDY6g4cPt2uPc2bPBYwvtmIpArwGTeqnfaXGLulr3cdESNkYVY3K9wd4gJB3YZA_A9F4JK43PpuSadb9V6pV-MxDcAIb41kh_tX-P4_oks-HHPDAaCgYKAb8SARMSFQHGX2Miu4BeJLtQv2es4ywNFL896Q0169', '', '2024-01-07 23:39:21.00876+00', '2024-01-07 23:41:07.227622+00', 'oauth');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '0e6a3adc-b3f9-432a-9a5a-1833618c52d1', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$VnhdFqIFqfuhSL51nAtMVefLneUr4pL5cNUknp7LuQgT5cX/uY2EK', '2024-01-08 02:43:05.618809+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-01-08 02:43:05.615496+00', '2024-01-08 02:43:05.619022+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', 'e1228cee-0646-4ff4-a5b4-407cdaba2ddf', 'authenticated', 'authenticated', 'test2@test.com', '$2a$10$ovdB5D6L.lYeHrpk0WFVzebkAspry29B4sgH9yNr7ClKdyVEhfjze', '2024-01-08 02:43:55.817071+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-01-08 02:43:55.814263+00', '2024-01-08 02:43:55.817264+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '9cda8f62-c696-4c77-8a4a-523496c91dc7', 'authenticated', 'authenticated', 'test1@test.com', '$2a$10$hlczYpPe.Ohh5RzlSU6/FetQDmwAX5onBu.W7raE7anYTwRx2edPm', NULL, NULL, '0f3198ccad81f46f6dffa0c777781118fd67651faf81636e049181c2', '2024-01-08 15:05:50.083269+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "test"}', NULL, '2024-01-08 15:04:42.263948+00', '2024-01-08 15:05:51.756846+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '3161ff50-973a-4cf1-89f7-dfc705b83542', 'authenticated', 'authenticated', 'carloscalvonazabal@gmail.com', '$2a$10$Gh/CpAEyzF09toX1WULr5uCuGU/87aqttOeQANqCQPJI.2Sh3sIvi', '2024-01-07 22:07:19.012887+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-01-09 20:11:06.010997+00', '{"provider": "email", "providers": ["email", "google"]}', '{"iss": "https://accounts.google.com", "sub": "114341587968980895494", "name": "Carlos Calvo Nazábal", "email": "carloscalvonazabal@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJuyLScnimTZt0icHShNTeo_V7g9xF9OjJr1zsFN363dVUl=s96-c", "full_name": "Carlos Calvo Nazábal", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJuyLScnimTZt0icHShNTeo_V7g9xF9OjJr1zsFN363dVUl=s96-c", "provider_id": "114341587968980895494", "email_verified": true, "phone_verified": false}', NULL, '2024-01-07 22:07:19.005344+00', '2024-01-09 20:11:06.012938+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '1ca3b15b-8536-484d-a657-eccbded1581b', 'authenticated', 'authenticated', 'test3@tes.com', '$2a$10$Dq3xRHGo/ahTGK/FCIHaTuAXkFjKChcDuy7H108i0DTd3TOAEzZhu', NULL, NULL, 'f5e70d79ad7ae869080ccfa8ba8784306c0966ed9ad3e1d04b5f440c', '2024-01-08 14:45:31.333432+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "testy mctets"}', NULL, '2024-01-08 14:45:31.329816+00', '2024-01-08 14:45:33.065803+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('3161ff50-973a-4cf1-89f7-dfc705b83542', '3161ff50-973a-4cf1-89f7-dfc705b83542', '{"sub": "3161ff50-973a-4cf1-89f7-dfc705b83542", "email": "carloscalvonazabal@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-01-07 22:07:19.008552+00', '2024-01-07 22:07:19.008607+00', '2024-01-07 22:07:19.008607+00', '55ed7ee9-052e-4ff8-960c-be49dae48459'),
	('114341587968980895494', '3161ff50-973a-4cf1-89f7-dfc705b83542', '{"iss": "https://accounts.google.com", "sub": "114341587968980895494", "name": "Carlos Calvo Nazábal", "email": "carloscalvonazabal@gmail.com", "picture": "https://lh3.googleusercontent.com/a/ACg8ocJuyLScnimTZt0icHShNTeo_V7g9xF9OjJr1zsFN363dVUl=s96-c", "full_name": "Carlos Calvo Nazábal", "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJuyLScnimTZt0icHShNTeo_V7g9xF9OjJr1zsFN363dVUl=s96-c", "provider_id": "114341587968980895494", "email_verified": true, "phone_verified": false}', 'google', '2024-01-07 23:18:35.42266+00', '2024-01-07 23:18:35.422708+00', '2024-01-09 20:11:06.007579+00', '10583f2a-d7ea-41b8-b690-94ff0c027354'),
	('0e6a3adc-b3f9-432a-9a5a-1833618c52d1', '0e6a3adc-b3f9-432a-9a5a-1833618c52d1', '{"sub": "0e6a3adc-b3f9-432a-9a5a-1833618c52d1", "email": "test@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-01-08 02:43:05.616697+00', '2024-01-08 02:43:05.616748+00', '2024-01-08 02:43:05.616748+00', '68ec0c02-a39c-48f4-8a77-6e09ca55ca9d'),
	('e1228cee-0646-4ff4-a5b4-407cdaba2ddf', 'e1228cee-0646-4ff4-a5b4-407cdaba2ddf', '{"sub": "e1228cee-0646-4ff4-a5b4-407cdaba2ddf", "email": "test2@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-01-08 02:43:55.815245+00', '2024-01-08 02:43:55.815294+00', '2024-01-08 02:43:55.815294+00', '2c6bf572-00ba-4ab7-99dd-6951ff9fa387'),
	('1ca3b15b-8536-484d-a657-eccbded1581b', '1ca3b15b-8536-484d-a657-eccbded1581b', '{"sub": "1ca3b15b-8536-484d-a657-eccbded1581b", "email": "test3@tes.com", "email_verified": false, "phone_verified": false}', 'email', '2024-01-08 14:45:31.332058+00', '2024-01-08 14:45:31.332105+00', '2024-01-08 14:45:31.332105+00', 'a60f486b-947e-4b70-91d0-dac11ed419f7'),
	('9cda8f62-c696-4c77-8a4a-523496c91dc7', '9cda8f62-c696-4c77-8a4a-523496c91dc7', '{"sub": "9cda8f62-c696-4c77-8a4a-523496c91dc7", "email": "test1@test.com", "email_verified": false, "phone_verified": false}', 'email', '2024-01-08 15:04:42.266281+00', '2024-01-08 15:04:42.266535+00', '2024-01-08 15:04:42.266535+00', '508cf39a-beb0-42ac-a259-e369f9156849');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('1814e2f2-91bf-42f1-a08b-9ce5bff6bca3', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-07 23:02:28.122301+00', '2024-01-07 23:02:28.122301+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36', '190.19.194.130', NULL),
	('8bf970aa-58be-451b-9c46-5a9fb5b7594c', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-07 23:02:36.531251+00', '2024-01-07 23:02:36.531251+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36', '190.19.194.130', NULL),
	('9f2060ce-3fec-4be3-a59f-c9f9d0afe263', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-07 23:18:35.425924+00', '2024-01-07 23:18:35.425924+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', '190.19.194.130', NULL),
	('40bbde8f-96be-49ce-98b2-afd616f33211', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-07 23:19:42.189144+00', '2024-01-07 23:19:42.189144+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', '190.19.194.130', NULL),
	('e9506f5e-05ec-4f6c-a167-c148ed1eaae3', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-08 02:15:26.287844+00', '2024-01-08 03:15:27.38106+00', NULL, 'aal1', NULL, '2024-01-08 03:15:27.380985', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36', '190.19.194.130', NULL),
	('5feed212-1d73-4edf-ba18-94e376e19ea1', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-08 04:09:48.116464+00', '2024-01-08 14:14:01.173252+00', NULL, 'aal1', NULL, '2024-01-08 14:14:01.173181', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36', '190.19.194.130', NULL),
	('dffd041d-ef29-46de-8a59-2a4d5e25090b', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-08 15:17:51.762943+00', '2024-01-09 19:05:24.32919+00', NULL, 'aal1', NULL, '2024-01-09 19:05:24.329119', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36', '190.19.194.130', NULL),
	('31fb4652-ca97-4a1e-8acc-535bb58e6a2b', '3161ff50-973a-4cf1-89f7-dfc705b83542', '2024-01-09 20:11:06.011075+00', '2024-01-09 20:11:06.011075+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1.2 Mobile/15E148 Safari/604.1', '190.19.194.130', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('1814e2f2-91bf-42f1-a08b-9ce5bff6bca3', '2024-01-07 23:02:28.126967+00', '2024-01-07 23:02:28.126967+00', 'password', '4a181717-48b8-4865-88c2-36b7f1f40729'),
	('8bf970aa-58be-451b-9c46-5a9fb5b7594c', '2024-01-07 23:02:36.533196+00', '2024-01-07 23:02:36.533196+00', 'password', '8813bfa1-b20e-4a79-9627-16265ece034e'),
	('9f2060ce-3fec-4be3-a59f-c9f9d0afe263', '2024-01-07 23:18:35.429751+00', '2024-01-07 23:18:35.429751+00', 'oauth', '3c72b330-0310-47ac-8e5b-57f1352c7055'),
	('40bbde8f-96be-49ce-98b2-afd616f33211', '2024-01-07 23:19:42.191602+00', '2024-01-07 23:19:42.191602+00', 'oauth', 'a5091a05-e422-4745-9a44-86f2e28ebce0'),
	('e9506f5e-05ec-4f6c-a167-c148ed1eaae3', '2024-01-08 02:15:26.289658+00', '2024-01-08 02:15:26.289658+00', 'oauth', 'cf6903a3-992a-4c65-8f56-7909d238094f'),
	('5feed212-1d73-4edf-ba18-94e376e19ea1', '2024-01-08 04:09:48.11869+00', '2024-01-08 04:09:48.11869+00', 'oauth', 'c124fd36-5c14-4313-bf99-0cf5e5f7d140'),
	('dffd041d-ef29-46de-8a59-2a4d5e25090b', '2024-01-08 15:17:51.764844+00', '2024-01-08 15:17:51.764844+00', 'oauth', '662b17c9-4463-4561-8bb8-1fb43f579dcb'),
	('31fb4652-ca97-4a1e-8acc-535bb58e6a2b', '2024-01-09 20:11:06.013206+00', '2024-01-09 20:11:06.013206+00', 'oauth', '436ddf04-b26d-4c0f-8890-a14e4fc7ebc9');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'JKrRdriHQmAiSgQtJx-K_A', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-07 23:02:28.123764+00', '2024-01-07 23:02:28.123764+00', NULL, '1814e2f2-91bf-42f1-a08b-9ce5bff6bca3'),
	('00000000-0000-0000-0000-000000000000', 2, 'c6MWCXLsYVgdl3h_7pC1nw', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-07 23:02:36.531955+00', '2024-01-07 23:02:36.531955+00', NULL, '8bf970aa-58be-451b-9c46-5a9fb5b7594c'),
	('00000000-0000-0000-0000-000000000000', 3, 'PRdVoR5K4AM852P_QbiXsg', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-07 23:18:35.427004+00', '2024-01-07 23:18:35.427004+00', NULL, '9f2060ce-3fec-4be3-a59f-c9f9d0afe263'),
	('00000000-0000-0000-0000-000000000000', 4, 'AbSfI12zGsvrE_DqsxjiIA', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-07 23:19:42.190043+00', '2024-01-07 23:19:42.190043+00', NULL, '40bbde8f-96be-49ce-98b2-afd616f33211'),
	('00000000-0000-0000-0000-000000000000', 5, 'gzEz7uwrlXgm_mvfBQ_GuA', '3161ff50-973a-4cf1-89f7-dfc705b83542', true, '2024-01-08 02:15:26.288496+00', '2024-01-08 03:15:27.378265+00', NULL, 'e9506f5e-05ec-4f6c-a167-c148ed1eaae3'),
	('00000000-0000-0000-0000-000000000000', 6, 'piyqdBJEd2O6sn5yV8Z22A', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-08 03:15:27.378958+00', '2024-01-08 03:15:27.378958+00', 'gzEz7uwrlXgm_mvfBQ_GuA', 'e9506f5e-05ec-4f6c-a167-c148ed1eaae3'),
	('00000000-0000-0000-0000-000000000000', 7, 'gNce97xV-1v_difEGHKUtw', '3161ff50-973a-4cf1-89f7-dfc705b83542', true, '2024-01-08 04:09:48.117329+00', '2024-01-08 13:13:51.700582+00', NULL, '5feed212-1d73-4edf-ba18-94e376e19ea1'),
	('00000000-0000-0000-0000-000000000000', 8, 'LSpwMYmMNxvsm4Z3CeQVqw', '3161ff50-973a-4cf1-89f7-dfc705b83542', true, '2024-01-08 13:13:51.700949+00', '2024-01-08 14:14:01.171203+00', 'gNce97xV-1v_difEGHKUtw', '5feed212-1d73-4edf-ba18-94e376e19ea1'),
	('00000000-0000-0000-0000-000000000000', 9, 'SBjsitxBYel6GVB6FNyOsA', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-08 14:14:01.171563+00', '2024-01-08 14:14:01.171563+00', 'LSpwMYmMNxvsm4Z3CeQVqw', '5feed212-1d73-4edf-ba18-94e376e19ea1'),
	('00000000-0000-0000-0000-000000000000', 10, 'V9zz6LEDkun33B77vp-8Cg', '3161ff50-973a-4cf1-89f7-dfc705b83542', true, '2024-01-08 15:17:51.76372+00', '2024-01-08 18:45:29.157399+00', NULL, 'dffd041d-ef29-46de-8a59-2a4d5e25090b'),
	('00000000-0000-0000-0000-000000000000', 11, 'KuzYEYdsBSnHGmoF4iqp2w', '3161ff50-973a-4cf1-89f7-dfc705b83542', true, '2024-01-08 18:45:29.159473+00', '2024-01-09 13:57:34.503776+00', 'V9zz6LEDkun33B77vp-8Cg', 'dffd041d-ef29-46de-8a59-2a4d5e25090b'),
	('00000000-0000-0000-0000-000000000000', 12, 'OV9QaLmGCBxJQCfcz1jlXA', '3161ff50-973a-4cf1-89f7-dfc705b83542', true, '2024-01-09 13:57:34.505703+00', '2024-01-09 19:05:24.326918+00', 'KuzYEYdsBSnHGmoF4iqp2w', 'dffd041d-ef29-46de-8a59-2a4d5e25090b'),
	('00000000-0000-0000-0000-000000000000', 13, 'hB3e6VU3-wP43jSlw4BMBQ', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-09 19:05:24.327256+00', '2024-01-09 19:05:24.327256+00', 'OV9QaLmGCBxJQCfcz1jlXA', 'dffd041d-ef29-46de-8a59-2a4d5e25090b'),
	('00000000-0000-0000-0000-000000000000', 14, '4isOojIijp357jBhbpt9JA', '3161ff50-973a-4cf1-89f7-dfc705b83542', false, '2024-01-09 20:11:06.011891+00', '2024-01-09 20:11:06.011891+00', NULL, '31fb4652-ca97-4a1e-8acc-535bb58e6a2b');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."expenses" ("id", "created_at", "type", "date", "amount", "description") VALUES
	('42eaebbc-331f-4553-88eb-4272ef9ebb6c', '2024-01-01 21:48:54+00', 'expense', '2024-01-01 21:49:03+00', 1000, 'Birras');


--
-- Data for Name: expense_debtors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."expense_debtors" ("id", "created_at", "expense_id", "user_id", "amount") VALUES
	('5f68f378-a598-4d00-9101-cfc9a3cbda5c', '2024-01-08 02:58:17.783829+00', '42eaebbc-331f-4553-88eb-4272ef9ebb6c', '0e6a3adc-b3f9-432a-9a5a-1833618c52d1', 500),
	('6a90d6b7-ac38-4585-a036-e7a9a77c85f8', '2024-01-08 02:58:42.182988+00', '42eaebbc-331f-4553-88eb-4272ef9ebb6c', '3161ff50-973a-4cf1-89f7-dfc705b83542', 500);


--
-- Data for Name: expense_payers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."expense_payers" ("id", "created_at", "expense_id", "user_id", "amount") VALUES
	('4982d7b1-67bb-41cf-a3a4-250d77051f37', '2024-01-08 02:46:26.528829+00', '42eaebbc-331f-4553-88eb-4272ef9ebb6c', '3161ff50-973a-4cf1-89f7-dfc705b83542', 1000);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."groups" ("id", "created_at", "name", "category", "currency") VALUES
	('baa429da-9116-4437-8335-be4fb1b3d81d', '2024-01-08 19:24:48.281059+00', 'test', 'friends', 'ARS');


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."members" ("id", "created_at", "user_id", "group_id", "is_admin") VALUES
	('f37520e0-b956-48b6-b271-7f984d7fdfd2', '2024-01-08 19:25:16.090591+00', '3161ff50-973a-4cf1-89f7-dfc705b83542', 'baa429da-9116-4437-8335-be4fb1b3d81d', true),
	('7cb59219-2d2a-4b52-a7ab-829ddaef8018', '2024-01-08 19:25:31.846849+00', '1ca3b15b-8536-484d-a657-eccbded1581b', 'baa429da-9116-4437-8335-be4fb1b3d81d', false),
	('41392a49-2f7c-4355-8a01-905ab426bf6f', '2024-01-08 19:25:42.016234+00', '9cda8f62-c696-4c77-8a4a-523496c91dc7', 'baa429da-9116-4437-8335-be4fb1b3d81d', false);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

INSERT INTO "supabase_migrations"."schema_migrations" ("version", "statements", "name") VALUES
	('20240109165358', '{"SET statement_timeout = 0","SET lock_timeout = 0","SET idle_in_transaction_session_timeout = 0","SET client_encoding = ''UTF8''","SET standard_conforming_strings = on","SELECT pg_catalog.set_config(''search_path'', ''\"public\", \"extensions\"'', false)","SET check_function_bodies = false","SET xmloption = content","SET client_min_messages = warning","SET row_security = off","CREATE EXTENSION IF NOT EXISTS \"pgsodium\" WITH SCHEMA \"pgsodium\"","CREATE SCHEMA IF NOT EXISTS \"supabase_migrations\"","ALTER SCHEMA \"supabase_migrations\" OWNER TO \"postgres\"","CREATE EXTENSION IF NOT EXISTS \"pg_graphql\" WITH SCHEMA \"graphql\"","CREATE EXTENSION IF NOT EXISTS \"pg_stat_statements\" WITH SCHEMA \"extensions\"","CREATE EXTENSION IF NOT EXISTS \"pgcrypto\" WITH SCHEMA \"extensions\"","CREATE EXTENSION IF NOT EXISTS \"pgjwt\" WITH SCHEMA \"extensions\"","CREATE EXTENSION IF NOT EXISTS \"supabase_vault\" WITH SCHEMA \"vault\"","CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\" WITH SCHEMA \"extensions\"","CREATE TYPE \"public\".\"group_type_enum\" AS ENUM (
    ''friends'',
    ''family'',
    ''travel'',
    ''work''
)","ALTER TYPE \"public\".\"group_type_enum\" OWNER TO \"postgres\"","CREATE TYPE \"public\".\"transaction_type_enum\" AS ENUM (
    ''payment'',
    ''expense''
)","ALTER TYPE \"public\".\"transaction_type_enum\" OWNER TO \"postgres\"","SET default_tablespace = ''''","SET default_table_access_method = \"heap\"","CREATE TABLE IF NOT EXISTS \"public\".\"dummy_expense_debtors\" (
    \"id\" uuid DEFAULT gen_random_uuid() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT now() NOT NULL,
    \"expense_id\" uuid NOT NULL,
    \"user_id\" uuid NOT NULL,
    \"amount\" numeric NOT NULL
)","ALTER TABLE \"public\".\"dummy_expense_debtors\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"public\".\"dummy_expense_payers\" (
    \"id\" uuid DEFAULT gen_random_uuid() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT now() NOT NULL,
    \"expense_id\" uuid NOT NULL,
    \"user_id\" uuid NOT NULL,
    \"amount\" numeric NOT NULL
)","ALTER TABLE \"public\".\"dummy_expense_payers\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"public\".\"dummy_expenses\" (
    \"id\" uuid DEFAULT gen_random_uuid() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT now() NOT NULL,
    \"type\" transaction_type_enum NOT NULL,
    \"date\" timestamp with time zone DEFAULT (now() AT TIME ZONE ''art''::text) NOT NULL,
    \"amount\" numeric NOT NULL,
    \"description\" character varying
)","ALTER TABLE \"public\".\"dummy_expenses\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"public\".\"dummy_groups\" (
    \"id\" uuid DEFAULT gen_random_uuid() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT now() NOT NULL,
    \"name\" character varying NOT NULL,
    \"category\" group_type_enum NOT NULL,
    \"currency\" text DEFAULT ''ARS''::text NOT NULL
)","ALTER TABLE \"public\".\"dummy_groups\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"public\".\"dummy_members\" (
    \"id\" uuid DEFAULT gen_random_uuid() NOT NULL,
    \"created_at\" timestamp with time zone DEFAULT now() NOT NULL,
    \"user_id\" uuid NOT NULL,
    \"group_id\" uuid NOT NULL,
    \"is_admin\" boolean DEFAULT false NOT NULL
)","ALTER TABLE \"public\".\"dummy_members\" OWNER TO \"postgres\"","CREATE TABLE IF NOT EXISTS \"supabase_migrations\".\"schema_migrations\" (
    \"version\" text NOT NULL,
    \"statements\" text[],
    \"name\" text
)","ALTER TABLE \"supabase_migrations\".\"schema_migrations\" OWNER TO \"postgres\"","ALTER TABLE ONLY \"public\".\"dummy_expense_debtors\"
    ADD CONSTRAINT \"dummy_expense_debtors_pkey\" PRIMARY KEY (\"id\", \"expense_id\", \"user_id\")","ALTER TABLE ONLY \"public\".\"dummy_expense_payers\"
    ADD CONSTRAINT \"dummy_expense_payers_pkey\" PRIMARY KEY (\"id\", \"expense_id\", \"user_id\")","ALTER TABLE ONLY \"public\".\"dummy_groups\"
    ADD CONSTRAINT \"dummy_groups_pkey\" PRIMARY KEY (\"id\")","ALTER TABLE ONLY \"public\".\"dummy_members\"
    ADD CONSTRAINT \"dummy_members_pkey\" PRIMARY KEY (\"id\", \"user_id\", \"group_id\")","ALTER TABLE ONLY \"public\".\"dummy_expenses\"
    ADD CONSTRAINT \"expenses_pkey\" PRIMARY KEY (\"id\")","ALTER TABLE ONLY \"supabase_migrations\".\"schema_migrations\"
    ADD CONSTRAINT \"schema_migrations_pkey\" PRIMARY KEY (\"version\")","ALTER TABLE ONLY \"public\".\"dummy_expense_debtors\"
    ADD CONSTRAINT \"dummy_expense_debtors_expense_id_fkey\" FOREIGN KEY (expense_id) REFERENCES dummy_expenses(id) ON UPDATE CASCADE ON DELETE CASCADE","ALTER TABLE ONLY \"public\".\"dummy_expense_debtors\"
    ADD CONSTRAINT \"dummy_expense_debtors_user_id_fkey\" FOREIGN KEY (user_id) REFERENCES auth.users(id)","ALTER TABLE ONLY \"public\".\"dummy_expense_payers\"
    ADD CONSTRAINT \"dummy_expense_payers_expense_id_fkey\" FOREIGN KEY (expense_id) REFERENCES dummy_expenses(id) ON UPDATE CASCADE ON DELETE CASCADE","ALTER TABLE ONLY \"public\".\"dummy_expense_payers\"
    ADD CONSTRAINT \"dummy_expense_payers_user_id_fkey\" FOREIGN KEY (user_id) REFERENCES auth.users(id)","ALTER TABLE ONLY \"public\".\"dummy_members\"
    ADD CONSTRAINT \"dummy_members_group_id_fkey\" FOREIGN KEY (group_id) REFERENCES dummy_groups(id)","ALTER TABLE ONLY \"public\".\"dummy_members\"
    ADD CONSTRAINT \"dummy_members_user_id_fkey\" FOREIGN KEY (user_id) REFERENCES auth.users(id)","CREATE POLICY \"Enable read access for all users\" ON \"public\".\"dummy_expense_debtors\" FOR SELECT TO anon USING (true)","CREATE POLICY \"Enable read access for all users\" ON \"public\".\"dummy_expense_payers\" FOR SELECT TO anon USING (true)","CREATE POLICY \"Enable read access for all users\" ON \"public\".\"dummy_expenses\" FOR SELECT TO anon USING (true)","ALTER TABLE \"public\".\"dummy_expense_debtors\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \"public\".\"dummy_expense_payers\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \"public\".\"dummy_expenses\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \"public\".\"dummy_groups\" ENABLE ROW LEVEL SECURITY","ALTER TABLE \"public\".\"dummy_members\" ENABLE ROW LEVEL SECURITY","GRANT USAGE ON SCHEMA \"public\" TO \"postgres\"","GRANT USAGE ON SCHEMA \"public\" TO \"anon\"","GRANT USAGE ON SCHEMA \"public\" TO \"authenticated\"","GRANT USAGE ON SCHEMA \"public\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"dummy_expense_debtors\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"dummy_expense_debtors\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"dummy_expense_debtors\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"dummy_expense_payers\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"dummy_expense_payers\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"dummy_expense_payers\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"dummy_expenses\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"dummy_expenses\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"dummy_expenses\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"dummy_groups\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"dummy_groups\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"dummy_groups\" TO \"service_role\"","GRANT ALL ON TABLE \"public\".\"dummy_members\" TO \"anon\"","GRANT ALL ON TABLE \"public\".\"dummy_members\" TO \"authenticated\"","GRANT ALL ON TABLE \"public\".\"dummy_members\" TO \"service_role\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"postgres\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"anon\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"authenticated\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON SEQUENCES  TO \"service_role\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"postgres\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"anon\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"authenticated\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON FUNCTIONS  TO \"service_role\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"postgres\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"anon\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"authenticated\"","ALTER DEFAULT PRIVILEGES FOR ROLE \"postgres\" IN SCHEMA \"public\" GRANT ALL ON TABLES  TO \"service_role\"","RESET ALL"}', 'remote_schema');


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 14, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
