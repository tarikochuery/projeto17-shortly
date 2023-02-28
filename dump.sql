--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shorturls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shorturls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "userId" integer NOT NULL,
    "visitsCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: shorturls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shorturls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shorturls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shorturls_id_seq OWNED BY public.shorturls.id;


--
-- Name: shorturls_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."shorturls_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shorturls_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."shorturls_userId_seq" OWNED BY public.shorturls."userId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-02-28 17:32:51.964302'::timestamp without time zone NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: shorturls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorturls ALTER COLUMN id SET DEFAULT nextval('public.shorturls_id_seq'::regclass);


--
-- Name: shorturls userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorturls ALTER COLUMN "userId" SET DEFAULT nextval('public."shorturls_userId_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: shorturls; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Joao', 'joao@driven.com.br', '$2b$10$TMPLFc8qdr2irnYhfRj.5.9.2Bf46G1onHaOVkIui2yByoozqfOpy', '2023-02-28 17:32:51.964302');


--
-- Name: shorturls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shorturls_id_seq', 1, true);


--
-- Name: shorturls_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shorturls_userId_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: shorturls ShortUrls_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorturls
    ADD CONSTRAINT "ShortUrls_pk" PRIMARY KEY (id);


--
-- Name: shorturls shorturls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorturls
    ADD CONSTRAINT "shorturls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: shorturls shorturls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shorturls
    ADD CONSTRAINT shorturls_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

